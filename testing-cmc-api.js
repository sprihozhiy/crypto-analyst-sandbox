require('dotenv').config()
const axios = require('axios');

// const scrapeStaySafu = require('./staysafu');
const CheckERC20Safety = require('./token-scanner-2');

const URL = 'https://pro-api.coinmarketcap.com/';
const latestAPI = 'v1/cryptocurrency/listings/latest';
const TEST_CMC_API = process.env.TEST_CMC_API;


let latestTokens = [];
let tokenCards = [];

async function getLatestFiveListings() {
    try {
      const response = await axios.get(`${URL}${latestAPI}?limit=5&sort=date_added&cryptocurrency_type=tokens`, {
          headers: {
            'X-CMC_PRO_API_KEY': TEST_CMC_API,
          },
          json: true,
          method: 'GET'
      });
      const data = response.data.data;
    //   console.log(data);
      latestTokens = data;
    //   console.log(latestTokens);
    } catch (error) {
      console.error(error);
    }
}

async function createTokenCards(arr) {
    try {
      const tokenarray = await Promise.all(arr.map(async i => {
        if (i.platform !== null ) {
        const TokenCard = {
          token_platform: `${i.platform === null ? 'n/a' : i.platform.name}`,
          token_symbol: i.symbol,
          token_name: i.name,
          token_contract: `${i.platform === null ? 'n/a' : i.platform.token_address}`,
          token_listing_url: `https://coinmarketcap.com/currencies/${i.slug}`,
          token_tokenomics: `${i.platform.name === 'Binance Smart Chain (BEP20)' ? await CheckERC20Safety(i.platform.token_address) : null}`,
        }
        return TokenCard;
      } else {
        const TokenCard = {
          token_platform: `${i.platform === null ? 'n/a' : i.platform.name}`,
          token_symbol: `${i.symbol === null ? 'n/a' : i.symbol }`,
          token_name: `${i.name === null ? 'n/a' : i.name}`,
          token_contract: `${i.platform === null ? 'n/a' : i.platform.token_address}`,
          token_listing_url: `https://coinmarketcap.com/currencies/${i.slug}`,
        }
        return TokenCard;
      }
      }));
      tokenCards = tokenarray;
      latestTokens = [];
    } catch (e) {
      console.log(e)
    }
  }

setInterval(async function() { 
    getLatestFiveListings().then(() => createTokenCards(latestTokens)).then(()=> console.log(tokenCards));
  
    // console.log(listingsForDB);
    console.log('API call have been made');
}, 10000);