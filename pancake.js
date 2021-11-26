const axios = require('axios');

const TokenAddress = '0x378a8979100ebf4108d641e937868b31c35739f7'

async function getTokenInfo(address) {
    try {
      const response = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${address}`);
      const data = response;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}

getTokenInfo(TokenAddress);
