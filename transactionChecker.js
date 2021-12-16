require('dotenv').config();
const Web3 = require('web3');
const BSC_NODE_API = process.env.BSC_NODE_API;

async function checkBlock(contract) {
    const provider = new Web3.providers.HttpProvider(BSC_NODE_API);
    const web3 = new Web3(provider);
    let block = await web3.eth.getBlock('13235813');
    let number = block.number;
    // let number = '13235813';
    console.log('Searching block is ' + number);

    if(block !== null && block.transactions !== null) {
        for (let txHash of block.transactions) {
            let tx = await web3.eth.getTransaction(txHash);
            if(contract === tx.to.toLowerCase()) {
                console.log('Transaction found on block: ' + number);
                console.log({address: tx.from, value: web3.utils.fromWei(tx.value, "ether"), timestamp: new Date()});
            } else {
                console.log('There are no transactions for this contract in the latest block')
            }
        }
    }
}

const TransactionChecker = async (contract) => {
    const contractAdr = contract.toLowerCase();
    await checkBlock(contractAdr);
}

// TransactionChecker('0x378a8979100ebf4108d641e937868b31c35739f7');