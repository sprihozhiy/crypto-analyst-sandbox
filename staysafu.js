const puppeteer = require('puppeteer');

const url = 'https://tools.staysafu.org/scan?a=';

async function scrapeStaySafu(tokenAddress) {
    const browser = await puppeteer.launch({ 
      // headless: false,
      args: [
        '--no-sandbox',
        // '--disable-setuid-sandbox'
      ] 
    });
    const page = await browser.newPage();
    await page.goto(url + tokenAddress);

    const element = await page.waitForSelector('.app-content');
    setTimeout(async()=>{
       const value = await element.evaluate(el => el.textContent);

       const isHonepotPart = value.search('Honeypot:');
       const resultStartIdx = isHonepotPart+9;
       const resulEndIdx = resultStartIdx + 2;
       const isHonepot = value.slice(resultStartIdx, resulEndIdx);
       const buyFee = value.match(/(?<=Buy fees:)(.*?)(?=\%)/);
       const sellFee = value.match(/(?<=Sell fees:)(.*?)(?=\%)/);
       const liquidityLocked = value.match(/(?<=Liquidity:)(.*?)(?=\Holders:)/);
       const tokenomics = {
           honepot: isHonepot,
           buyFee: buyFee[0],
           sellFee: sellFee[0],
           liquidityStatus: liquidityLocked[0]
       }
       return tokenomics;

    }, 30000);
  };

  function ping() {
    return new Promise((resolve) => {
      setTimeout(()=> { resolve('pinged') }, 10000);
    });
  }


module.exports = scrapeStaySafu;
// Binance Smart Chain (BEP20)



module.exports = ping;