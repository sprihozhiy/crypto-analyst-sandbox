const axios = require('axios');
require('dotenv').config();

const api = process.env.COVALENTHQ_API

const liquidityAPI = `https://api.covalenthq.com/v1/56/networks/pancakeswap_v2/assets/0x378a8979100ebf4108d641e937868b31c35739f7/?quote-currency=USD&format=JSON&tickers=&page-number=1&page-size=100&key=${api}`


const TokenAddress = '0x378a8979100ebf4108d641e937868b31c35739f7'

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