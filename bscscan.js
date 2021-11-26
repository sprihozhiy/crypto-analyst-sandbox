const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.BSCSCAN_API;
// const TokenAddress = '0x378a8979100ebf4108d641e937868b31c35739f7'
const TokenAddress = '0xd8619C731ba0e0Be2b5B8d1366e037D8BcC36591'

async function getTotalSupply(address) {
    try {
      const response = await axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${address}&apikey=${API_KEY}`);
      const data = response.data;
      console.log(data.result);
    } catch (error) {
      console.error(error);
    }
}

async function getTotalCirculatingSupply(address) {
    try {
      const response = await axios.get(`https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=${address}&apikey=${API_KEY}`);
      const data = response.data;
      console.log(data.result);
    } catch (error) {
      console.error(error);
    }
}

// getTotalSupply(TokenAddress);
// getTotalCirculatingSupply(TokenAddress);


async function getContractSourceCode(address) {
  try {
    const response = await axios.get(`https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`);
    const data = response.data;
    console.log(data.result);
  } catch (error) {
    console.error(error);
  }
}

getContractSourceCode(TokenAddress);