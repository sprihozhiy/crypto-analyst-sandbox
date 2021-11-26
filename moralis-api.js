require('dotenv').config();
const Moralis  = require('moralis/node');


const serverUrl = process.env.MORALIS_SERVER;
const appId = process.env.MORALIS_APP_ID;
Moralis.start({serverUrl, appId });

async function getData() {
    try {
        const options = { chain: "bsc", addresses: "0x378a8979100ebf4108d641e937868b31c35739f7" };
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        console.log(tokenMetadata);
    } catch (e) {
        console.log(e);
    }
    
}

getData();
