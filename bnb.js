const Web3 = require('web3');
require('dotenv').config();
const BSC_NODE_API = process.env.BSC_NODE_API;

const provider = new Web3.providers.HttpProvider(BSC_NODE_API);
const web3 = new Web3(provider);


async function getMaxes() {
    let sig = web3.eth.abi.encodeFunctionSignature({name: '_maxTxAmount', type: 'function', inputs: []});
    d = {
        to: address,
        // Binance Hot Wallet
        from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
        value: 0,
        gas: 15000000,
        data: sig,
    };
    try {
        let val = await web3.eth.call(d);
        maxTXAmount = web3.utils.toBN(val);
    } catch (e) {
        sig = web3.eth.abi.encodeFunctionSignature({name: 'maxSellTransactionAmount', type: 'function', inputs: []});
        d = {
            to: address,
            // Binance Hot Wallet
            from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
            value: 0,
            gas: 15000000,
            data: sig,
        };
        try {
            let val2 = await web3.eth.call(d);
            maxSell = web3.utils.toBN(val2);
        } catch (e) {

        }
    }
}

async function getBNBIn(address) {
    let amountIn = maxTXAmount;
    if(maxSell != 0) {
        amountIn = maxSell;
    }
    // WBNB address
    let WETH = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
    let path = [address, WETH];
    let sig = web3.eth.abi.encodeFunctionCall({
        name: 'getAmountsOut',
        type: 'function',
        inputs: [
            {type: 'uint256', name: 'amountIn'},
            {type: 'address[]', name: 'path'},
        ],
        outputs: [
            {type: 'uint256[]', name: 'amounts'},
        ],
    }, [amountIn, path]);

    d = {
        // PancakeSwap Router
        to: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        // Binance Hot Wallet
        from: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3',
        value: 0,
        gas: 15000000,
        data: sig,
    };
    try {
        let val = await web3.eth.call(d);
        let decoded = web3.eth.abi.decodeParameter('uint256[]', val);
        bnbIN = web3.utils.toBN(decoded[1]);
        maxTxBNB = bnbIN;
        bnbWorth = Math.round(maxTxBNB / 10**15) / 10**3;
        console.log(bnbWorth);
    } catch (e) {
        console.log(e);
    }
}


getBNBIn('0xD302c09BC32aEF53146B6bA7BC420F5CACa897f6');