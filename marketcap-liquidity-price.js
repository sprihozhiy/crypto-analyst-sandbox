require('dotenv').config();
const axios = require('axios');
const Moralis  = require('moralis/node');

const BigNumber = require('bignumber.js');


const serverUrl = process.env.MORALIS_SERVER;
const appId = process.env.MORALIS_APP_ID;
const BSCSCAN_API = process.env.BSCSCAN_API;
const COVALENTHQ_API = process.env.COVALENTHQ_API
Moralis.start({serverUrl, appId });

// async function getData() {
//     try {
//         const options = { chain: "bsc", addresses: "0x378a8979100ebf4108d641e937868b31c35739f7" };
//         const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
//         console.log(tokenMetadata);
//     } catch (e) {
//         console.log(e);
//     }
    
// }

// getData();





async function getPrice(address) {
    try {
        const options = {
            address: address,
            chain: "bsc",
            exchange: "pancakeswap-v2"
        };
        const price = await Moralis.Web3API.token.getTokenPrice(options);
        const roundedPrice = new BigNumber(price.usdPrice);
        
        console.log(roundedPrice);
        console.log(Number(roundedPrice.toFormat(4)));
    } catch (e) {
        console.log(e);
    }
}

getPrice('0xb27adaffb9fea1801459a1a81b17218288c097cc');

// --------------------------------------------
// Get LP Address and Token Liquidity
// --------------------------------------------


let pairAddress = {};
// This function find the LP address
async function getPairAddress(token1, token2) {
    try {
        const options = {
            // BNB
            token0_address: token1,
            // Token
            token1_address: token2,
            exchange: "pancakeswapv2",
            chain: "bsc"
        };
        const get_pair_token_BNB_address = await Moralis.Web3API.defi.getPairAddress(options);
        console.log(get_pair_token_BNB_address)
        const pair_token_BNB_address = get_pair_token_BNB_address.pairAddress;
        pairAddress.token0 = get_pair_token_BNB_address.token0.name;
        pairAddress.decimals0 = Number(get_pair_token_BNB_address.token0.decimals);
        pairAddress.token1 = get_pair_token_BNB_address.token1.name;
        pairAddress.decimals1 = Number(get_pair_token_BNB_address.token1.decimals);
        pairAddress.address = pair_token_BNB_address;
    } catch (e) {
        console.log(e);
    }
}

async function getReserves(address) {
    try {
        const options = {
            pair_address: address.address,
            chain: "bsc"
        };
        const reserves = await Moralis.Web3API.defi.getPairReserves(options);
        const firstToken = reserves.reserve0;
        const secondToken = reserves.reserve1;
        // console.log(`${address.token0}: ${firstToken / 10 ** 18}, ${address.token1}: ${secondToken / 10 ** 18 }`);
        if(address.token0 === "Wrapped BNB") {
            console.log(`BNB Liquidity: ${(firstToken  / 10 ** 18).toFixed(2)}`);
            // return firstToken;
        } else {
            console.log(`BNB Liquidity: ${(secondToken  / 10 ** 18).toFixed(2)}`);
            // return secondToken;
        }

    } catch (e) {
        console.log(e);
    }
}

const BNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
const TokenAddress = '0x4f745c0c7da552a348c384da1a5baeb28f2c607c';

// getPairAddress(TokenAddress, BNB).then(()=>getReserves(pairAddress));
// --------------------------------------------


// Get Total Burned Tokens

async function getBurnedTotal(addressToken) {
    try {
        const endpoint = `https://api.covalenthq.com/v1/56/tokens/${addressToken}/token_holders/?quote-currency=USD&format=JSON&page-number=&page-size=&key=${COVALENTHQ_API}`;
        const response = await axios.get(endpoint);
        const data = response.data;
        const arr = data.data.items;
        
        const burntAddress = arr.filter(i => i.address = "0x000000000000000000000000000000000000dead");
        const burntTokens = Number(burntAddress[0].balance) / 10 ** Number(burntAddress[0].contract_decimals);
        const sss = burntAddress.map(i => console.log(i.block_height));
        return burntTokens;

    } catch (error) {
        console.log(error);
    }
}

// getBurnedTotal('0x53F042f3e809d2DcC9492dE2DbF05d1DA0EF5fbb');

// Get Total Supply

async function getTotalSupply(address) {
    try {
        const response = await axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${address}&apikey=${BSCSCAN_API}`);
        const options = {chain: "bsc", addresses: address};
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        const tokenDecimals = Number(tokenMetadata[0].decimals);
        const data = response.data;
        const totalSupplyRaw = data.result;
        const totalSupply = totalSupplyRaw / 10 ** tokenDecimals;
        return totalSupply;

    } catch (error) {
      console.error(error);
    }
}

// Get Latest Token Price

async function getTokenPrice(address) {
    try {
        const USDT = "0x55d398326f99059ff775485246999027b3197955";

        // needs to optimize this API call to reduce their total quantity
        const options = {chain: "bsc", addresses: address};
        const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
        const tokenDecimals = Number(tokenMetadata[0].decimals);

        const response = await axios.get(`https://bsc.api.0x.org/swap/v1/quote?buyToken=${USDT}&sellToken=${address}&sellAmount=${10 ** tokenDecimals}&excludedSources=BakerySwap,Belt,DODO,DODO_V2,Ellipsis,Mooniswap,MultiHop,Nerve,SushiSwap,Smoothy,ApeSwap,CafeSwap,CheeseSwap,JulSwap,LiquidityProvider`);
        const price = new BigNumber(response.data.price);
        console.log(price.toFixed(tokenDecimals));
        return price;
    } catch (error) {
        console.log(error);
    }
}

// getTokenPrice('0xb27adaffb9fea1801459a1a81b17218288c097cc');



// Get Token Market Cap

async function getTokenMarketCap(address) {
    const supply = await getTotalSupply(address);
    const price = await getTokenPrice(address);
    const burnt = await getBurnedTotal(address);
    const marketCap = (supply - burnt) * price;
    return marketCap;
}

// getTokenMarketCap(TokenAddress);