const axios = require('axios');

const tokenAddress = '0x53f042f3e809d2dcc9492de2dbf05d1da0ef5fbb';
const decimals = 9;

async function getTokenPrice(address, tokenDecimals) {
    try {
        const USDT = "0x55d398326f99059ff775485246999027b3197955";

        const response = await axios.get(`https://bsc.api.0x.org/swap/v1/quote?buyToken=${USDT}&sellToken=${address}&sellAmount=${10 ** tokenDecimals}&excludedSources=BakerySwap,Belt,DODO,DODO_V2,Ellipsis,Mooniswap,MultiHop,Nerve,SushiSwap,Smoothy,ApeSwap,CafeSwap,CheeseSwap,JulSwap,LiquidityProvider`);
        const price = parseFloat(response.data.price);
        console.log(price);
    } catch (error) {
        console.log(error);
    }
}

getTokenPrice(tokenAddress, decimals);