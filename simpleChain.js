const SHA256 = require('crypto-js').SHA256;

// Class with a constructor for block data model
class Block {
    constructor(data) {
        this.hash = '';
        this.height = 0;
        this.body = data;
        this.timeStamp = '';
        this.previousblockhash = '0x';
    }
}

// Class with a constructor for a new Blockchain
// has support for the following methods:
// - createGenesisBlock()
// - getLatestBlock() 
// - caddBlock()
// - getBlock()
// - validateBlock()
// - validateChain()

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
