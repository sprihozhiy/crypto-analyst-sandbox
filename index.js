const axios = require('axios')

const URL = 'https://api.coingecko.com/api/v3/';

const list = 'coins/categories'

async function getListData() {
    try {
      const res = await axios.get(URL + list);
      console.log(res.data);
    } catch (err) {
      console.log(err, "Something went wrong");
    }
  }
  getListData();