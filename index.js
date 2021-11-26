const axios = require('axios')

const URL = 'https://api.coingecko.com/api/v3/';

async function getListData() {
    try {
      const res = await axios.get(URL + 'coins/zomainfinity/market_chart/range?vs_currency=usd&from=1634576040&to=1634662440');
      console.log(res.data);
    } catch (err) {
      console.log(err, "Something went wrong");
    }
  }
  getListData();