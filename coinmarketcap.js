const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.CMC_API;
const URL = 'https://pro-api.coinmarketcap.com/';
const latestAPI = 'v1/cryptocurrency/listings/latest';
const CmcIdMap = 'v1/cryptocurrency/map';


// const TokenURLonCMC = `https://coinmarketcap.com/currencies/${tokenslug}`;

// const TokenCard = {
//   token_id,
//   token_symbol,
//   token_name,
//   token_contract,
//   token_holders,
//   token_last_price,
//   token_liquidity,
//   token_24txns_volume,
//   token_listed_on,
//   token_marketcap,
//   token_listing_url,
//   token_tokenomics
// }

// const latestTokens = [
//   {
//     id: 14873,
//     name: 'GoofyDoge',
//     symbol: 'GoofyDoge',
//     slug: 'goofydoge',
//     num_market_pairs: 2,
//     date_added: '2021-11-19T15:42:06.000Z',
//     tags: [],
//     max_supply: 5280000000000,
//     circulating_supply: 0,
//     total_supply: 5280000000000,
//     cmc_rank: 2890,
//     last_updated: '2021-11-19T16:46:07.000Z',
    
//   },
//   {
//     id: 14872,
//     name: 'HUGHUG Coin',
//     symbol: 'HGHG',
//     slug: 'hughug-coin',
//     num_market_pairs: 1,
//     date_added: '2021-11-19T15:18:05.000Z',
//     tags: [],
//     max_supply: null,
//     circulating_supply: 0,
//     total_supply: 0,
    
//     cmc_rank: 2996,
//     last_updated: '2021-11-19T16:46:07.000Z',
    
//   },
//   {
//     id: 14871,
//     name: 'Windfall Token',
//     symbol: 'WFT',
//     slug: 'windfall-token',
//     num_market_pairs: 2,
//     date_added: '2021-11-19T15:14:28.000Z',
//     tags: [],
//     max_supply: null,
//     circulating_supply: 0,
//     total_supply: 0,
    
//     cmc_rank: 4562,
//     last_updated: '2021-11-19T16:46:07.000Z',
    
//   },
//   {
//     id: 14869,
//     name: 'The Moon Shiba',
//     symbol: 'MOONSHIB',
//     slug: 'the-moon-shiba',
//     num_market_pairs: 1,
//     date_added: '2021-11-19T15:06:05.000Z',
//     tags: [],
//     max_supply: null,
//     circulating_supply: 0,
//     total_supply: 420000000000000000,
    
//     cmc_rank: 3301,
//     last_updated: '2021-11-19T16:46:07.000Z',
    
//   },
//   {
//     id: 14867,
//     name: 'ETHER TERRESTRIAL',
//     symbol: 'ET',
//     slug: 'ether-terrestrial',
//     num_market_pairs: 1,
//     date_added: '2021-11-19T13:59:28.000Z',
//     tags: [],
//     max_supply: 1000000000000,
//     circulating_supply: 0,
//     total_supply: 0,
//     cmc_rank: 3164,
//     last_updated: '2021-11-19T16:46:07.000Z',
//   }
// ];

// async function getTokenAdress(tokensArray) {
//   try {
//     const tokenSymbols = tokensArray.map(token => token.symbol);
//     const requestTokens = tokenSymbols.join();
//     const response = await axios.get(`${URL}${CmcIdMap}?symbol=${requestTokens}`, {
//         headers: {
//           'X-CMC_PRO_API_KEY': API_KEY,
//         },
//         json: true,
//         method: 'GET'
//     });
//     const data = response.data.data;
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

async function getLatestFiveListings() {
    try {
      const response = await axios.get(`${URL}${latestAPI}?limit=25&sort=date_added&cryptocurrency_type=tokens`, {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
          json: true,
          method: 'GET'
      });
      const data = response.data.data;
      console.log(data);
      // latestTokens.push(data);
      // console.log(latestTokens);
    } catch (error) {
      console.error(error);
    }
}

// check for new listings every 5 minutes
// setInterval(function(){ 
//     getLatestFiveListings();
//     console.log('API call have been made');
// }, 300000);

getLatestFiveListings();

// getTokenAdress(latestTokens);