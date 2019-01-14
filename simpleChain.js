const SHA256 =  require('crypto-js').SHA256;

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
    }

    addBlock(newBlock){
        this.chain.push(newBlock);
    }
}




// const block1 = new Block('I am block 1');
// const block2 = new Block('I am block 2');

// const mauriceChain = new Blockchain();

// mauriceChain.addBlock(block1);
// console.log('mauriceChain', mauriceChain );
// console.log('---------------------')
// mauriceChain.addBlock(block2);
// console.log('mauriceChain', mauriceChain );
