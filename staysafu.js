const puppeteer = require('puppeteer');

const url = 'https://tools.staysafu.org/scan?a=';
const address = '0xb698Fb4e7052F2B6F25C22A7cAF081683CFB2e0b';

async function scrape() {
   const browser = await puppeteer.launch({ 
      // headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ] 
    });
    const page = await browser.newPage();
    await page.goto(url + address);

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
       console.log(`Honepot: ${isHonepot}, Buy Fee: ${buyFee[0]}, Sell Fee: ${sellFee[0]}, Liquidity: ${liquidityLocked[0]}`);

    }, 30000);
  };

  scrape();