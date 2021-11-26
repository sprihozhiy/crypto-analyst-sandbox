require('dotenv').config();
const { Telegraf } = require('telegraf');
const Broadcaster = require('telegraf-broadcast');
const { v4: uuidv4 } = require('uuid');
const app = require('./firebase/config');
const db = require('./firebase/config');
const { collection, addDoc, getDocs, doc, query, where, onSnapshot, updateDoc,  writeBatch } = require ('firebase/firestore');

// Telegram API token
const token = process.env.TELEGRAM_API;

// bot initialized
// const bot = new Telegraf(token);
// const broadcaster = new Broadcaster(bot);
// const userIds = [];

// async function addUserIDtoDB(user) {
//     try {
//         const docRef = await addDoc(collection(db, "users"), {
//             id: uuidv4(),
//             userID: user
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }

// async function getUsersIDfromDB() {
//     try {
//         const users = [];
//         const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//         users.push(doc.data());
//         });
//         // console.log(users);
//         return users;
//     } catch (e) {
//         console.error("Error of getting document: ", e); 
//     }
// }

// async function checkUserIDfromDB(currentUserID) {
//     // get all users from a db
//     const getAllUsers = await getUsersIDfromDB();
//     // convert data to users array
//     const userIds = await getAllUsers.map(user => user.id);
//     if(!userIds.includes(currentUserID)) {
//         return false;
//     } else {
//         return true;
//     }
// }

// async function broadcastDataAllUsers() {
//     // get all users from a db
//     const getAllUsers = await getUsersIDfromDB();
//     // convert data to users array
//     const usersToBroadcast = await getAllUsers.map(user => user.userID);
//     console.log(usersToBroadcast);
//     return usersToBroadcast;
//     // broadcast the message to users
//     broadcaster.sendText(usersToBroadcast, 'This is a broadcast message');
// }

// bot.start((ctx) => {
//     ctx.reply('Welcome to the TonkenSpector! I will notify you about new token listings on CoinMarketCap.');
//     if(checkUserIDfromDB(ctx.from.id) === false) {
//         addUserIDtoDB(ctx.from.id);
//     } else {
//         console.log('User has already in a db');
//     }
// });
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();



function sendToTelegram() {
    console.log('sent to Telegram');
}

// Update status of token listing to sent
async function updateStatus(arr) {
    const batch = writeBatch(db);
    arr.forEach(item => {
        let tokenRef = doc(db, 'cmc_listings', item);
        batch.update(tokenRef, {sent_by_bot: true});
    });
    await batch.commit();
}


// Bot listens to the database and send new listings to the Telegram Channel

async function sendToTelegramChannel() {
    try {
        const querySnapshot = await getDocs(collection(db, "cmc_listings"));
        let arrTokenToSend =[];
        querySnapshot.forEach((doc) => {
            const token = doc.data();
            const docRef = doc.id;
            if(token.sent_by_bot === false) {
                arrTokenToSend.push(docRef);
            }
        });
        // sendToTelegram();
        console.log(arrTokenToSend);
        updateStatus(arrTokenToSend);
        arrTokenToSend =[];
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}


// Invoke function every 1 minute
setInterval(function(){ 
    sendToTelegramChannel();
}, 60000);

