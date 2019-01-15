const SHA256 = require('crypto-js').SHA256;
const Block = require('./Block');

// Class with a constructor for a new Blockchain
// has support for the following methods:
// - createGenesisBlock() -  Creates the genesis block
// - getLatestBlock() - gets the latest block and returns it as a JSON string object
// - addBlock() - Adds a new block into the chain, to do that you need to assign the corresponding height, hash, previousBlockHash and timeStamp to your block.
// - getBlockHeight() - Counts all the Blocks in your chain and give you as a result the last height in your chain
// - getBlock() - Gets a block and returns it as a JSON string object
// - validateBlock(blockHeight) - Validates block data integrity
// - validateChain() - Validates blockchain is still valid at any moment

class Blockchain {
    constructor() {
        this.chain = [];
        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return new Block('Genesis Block');
    }

    addBlock(newBlock) {
        newBlock.height = this.chain.length;
        newBlock.timeStamp = new Date().getTime().toString().slice(0, -3); // Compatible UTC timestamp
        if (this.chain.length > 0) {
            newBlock.previousblockhash = this.chain[this.chain.length - 1].hash;
        }
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString(); // SHA256 requires a string of data
        this.chain.push(newBlock);
    }
}




const block1 = new Block('I am block 1');
const block2 = new Block('I am block 2');

const mauriceChain = new Blockchain();
console.log('mauriceChain', mauriceChain );
console.log('---------------------')
mauriceChain.addBlock(block1);
console.log('mauriceChain', mauriceChain );
console.log('---------------------')
mauriceChain.addBlock(block2);
console.log('mauriceChain', mauriceChain );
