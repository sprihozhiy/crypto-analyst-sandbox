const axios = require('axios');
require('dotenv').config();

const api = process.env.COVALENTHQ_API

const liquidityAPI = `https://api.covalenthq.com/v1/56/networks/pancakeswap_v2/assets/0x10af7a23d5a4ee03ddd19d4668374f445ace9fd6/?quote-currency=USD&format=JSON&tickers=&page-number=1&page-size=100&key=${api}`


const TokenAddress = '0x10af7a23d5a4ee03ddd19d4668374f445ace9fd6'

async function getTokenInfo() {
    try {
      const response = await axios.get(liquidityAPI);
      const data = response;
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
}

getTokenInfo();