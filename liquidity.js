require('dotenv').config();
const Moralis  = require('moralis/node');


const serverUrl = process.env.MORALIS_SERVER;
const appId = process.env.MORALIS_APP_ID;

Moralis.start({serverUrl, appId });

const BNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
const USDT = "0x55d398326f99059ff775485246999027b3197955";
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

const TokenAddress = '0x631C2f0EdABaC799f07550aEE4fF0Bf7fd35212B';

// --------------------------------------------
// Get LP Address and Token Liquidity
// --------------------------------------------

let pairAddress = {};

// This function find the LP address
async function getPairAddress(token1, token2) {
    try {
        const options = {
            // BNB, USDT or BUSD
            token0_address: token1,
            // Token
            token1_address: token2,
            exchange: "pancakeswapv2",
            chain: "bsc"
        };
        const get_pair_token_stableCoin_address = await Moralis.Web3API.defi.getPairAddress(options);
        const pair_token_BNB_address = get_pair_token_stableCoin_address.pairAddress;
        pairAddress.token0 = get_pair_token_stableCoin_address.token0.name;
        pairAddress.decimals0 = Number(get_pair_token_stableCoin_address.token0.decimals);
        pairAddress.token1 = get_pair_token_stableCoin_address.token1.name;
        pairAddress.decimals1 = Number(get_pair_token_stableCoin_address.token1.decimals);
        pairAddress.address = pair_token_BNB_address;
        
    } catch (e) {
        pairAddress.address = null;
        console.log(e);
    }
}


async function getReservesBNB(address) {
    try {
        if(address === null) {
            console.log('BNB: No Liquidity');
            return 0;
        } else {
            const options = {
                pair_address: address.address,
                chain: "bsc"
            };
            const reserves = await Moralis.Web3API.defi.getPairReserves(options);
            const firstToken = reserves.reserve0;
            const secondToken = reserves.reserve1;
            // console.log(`${address.token0}: ${firstToken / 10 ** 18}, ${address.token1}: ${secondToken / 10 ** 18 }`);
            if(address.token0 === "Wrapped BNB") {
                // console.log(`BNB Liquidity: ${(firstToken  / 10 ** 18).toFixed(2)}`);
                return (firstToken  / 10 ** 18).toFixed(2);
            } else {
                // console.log(`BNB Liquidity: ${(secondToken  / 10 ** 18).toFixed(2)}`);
                return (secondToken  / 10 ** 18).toFixed(2);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function getReservesUSDT(address) {
    try {
        if(address.address === null) {
            console.log('USDT: No Liquidity');
            return 0;
        } else {
            const options = {
                pair_address: address.address,
                chain: "bsc"
            };
            const reserves = await Moralis.Web3API.defi.getPairReserves(options);
            const firstToken = reserves.reserve0;
            const secondToken = reserves.reserve1;
            // console.log(`${address.token0}: ${firstToken / 10 ** 18}, ${address.token1}: ${secondToken / 10 ** 18 }`);
            if(address.token0 === "Tether USD") {
                // console.log(`USDT Liquidity: ${(firstToken  / 10 ** 18).toFixed(2)}`);
                return (firstToken  / 10 ** 18).toFixed(2);
            } else {
                // console.log(`USDT Liquidity: ${(secondToken  / 10 ** 18).toFixed(2)}`);
                return (secondToken  / 10 ** 18).toFixed(2);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

async function getReservesBUSD(address) {
    try {
        if(address.address === null) {
            console.log('USDT: No Liquidity');
            return 0;
        } else {
        const options = {
            pair_address: address.address,
            chain: "bsc"
        };
        const reserves = await Moralis.Web3API.defi.getPairReserves(options);
        const firstToken = reserves.reserve0;
        const secondToken = reserves.reserve1;
        // console.log(`${address.token0}: ${firstToken / 10 ** 18}, ${address.token1}: ${secondToken / 10 ** 18 }`);
        if(address.token0 === "BUSD Token") {
            // console.log(`BUSD Liquidity: ${(firstToken  / 10 ** 18).toFixed(2)}`);
            return (firstToken  / 10 ** 18).toFixed(2);
        } else {
            // console.log(`BUSD Liquidity: ${(secondToken  / 10 ** 18).toFixed(2)}`);
            return (secondToken  / 10 ** 18).toFixed(2);
            }
        }
    } catch (e) {
        console.log(e);
    }
}



// getPairAddress(TokenAddress, BNB).then(()=>getReservesBNB(pairAddress));
// getPairAddress(TokenAddress, USDT).then(()=>getReservesUSDT(pairAddress));
// getPairAddress(TokenAddress, BUSD).then(()=>getReservesBUSD(pairAddress));

async function getTotalLiquidity(address) {
    const bnbLiquidity = await getPairAddress(address, BNB).then(()=>getReservesBNB(pairAddress));
    const usdtLiquidity = await getPairAddress(address, USDT).then(()=>getReservesUSDT(pairAddress));
    const busdLiquidity = await getPairAddress(address, BUSD).then(()=>getReservesBUSD(pairAddress));
    console.log(`Liquidity. BNB: ${bnbLiquidity}, USDT: ${usdtLiquidity}, BUSD: ${busdLiquidity}`);
    // return `BNB: ${bnbLiquidity}, USDT: ${usdtLiquidity}, BUSD: ${busdLiquidity}`;
}

getTotalLiquidity(TokenAddress);