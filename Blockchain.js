/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
// const Block = require('./Block.js');

class Block {
	constructor(data) {
		this.hash = '',
			this.height = 0,
			this.body = data,
			this.timeStamp = 0,
			this.previousBlockHash = ''
	}
}
class Blockchain {

	constructor() {
		this.bd = new LevelSandbox.LevelSandbox();

		this.getBlockHeight().then((chainHeight) => {
			if (chainHeight === -1) {
				this.addBlock(new Block('This is the genesis block.')).then(() => {
					console.log('Blockchain is set up and genesis block has been added.')
				})
			}
		})
	}

	// Helper method to create a Genesis Block (always with height= 0)
	// You have to options, because the method will always execute when you create your blockchain
	// you will need to set this up statically or instead you can verify if the height !== 0 then you
	// will not create the genesis block
	async generateGenesisBlock() {
		await this.addBlock(new Block('Genesis Block'));
	}


	async getBlockHeight() {
		return await this.bd.getBlocksCount();
	}

	// Add new block
	async addBlock(newBlock) {
		let chainHeight = await this.getBlockHeight();
		newBlock.height = chainHeight + 1;
		newBlock.timeStamp = new Date().getTime().toString().slice(0, -3);

		if (newBlock.height > 0) {
			let previousBlock = await this.getBlock(chainHeight);

			newBlock.previousBlockHash = previousBlock.hash;
		}

		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

		return await this.bd.addLevelDBData(newBlock.height, JSON.stringify(newBlock));
	}

	// Get Block By Height
	async getBlock(height) {
		return await this.bd.getLevelDBData(height);
	}

	// Validate if Block is being tampered by Block Height
	async validateBlock(height) {
		let block = await this.getBlock(height)
		const blockHash = block.hash
		block.hash = ''

		let validBlockHash = SHA256(JSON.stringify(block)).toString()

		if (blockHash === validBlockHash) {
			return true
		} else {
			console.log(`Block #${height} invalid hash: ${blockHash} <> ${validBlockHash}`)
			return false
		}
	}

	// Validate Blockchain
	async validateChain() {
		let errorLog = []
		let previousHash = ''
		let isValidBlock = false
	
		const height = await this.bd.getBlocksCount()
	
		for (let i = 0; i < height; i++) {
		  this.getBlock(i).then((block) => {
			isValidBlock = this.validateBlock(block.height)
	
			if (!isValidBlock) {
			  errorLog.push(i)
			} 
	
			if (block.previousBlockHash !== previousHash) {
			  errorLog.push(i)
			}
	
			previousHash = block.hash
	
			if (i === (height -1)) {
			  if (errorLog.length > 0) {
				console.log(`Block errors = ${errorLog.length}`)
				console.log(`Blocks: ${errorLog}`)
			  } else {
				console.log('No errors detected')
			  }
			}
		  })
		}
	}

	// Utility Method to Tamper a Block for Test Validation
	// This method is for testing purpose
	_modifyBlock(height, block) {
		let self = this;
		return new Promise((resolve, reject) => {
			self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
				resolve(blockModified);
			}).catch((err) => { console.log(err); reject(err) });
		});
	}

}

module.exports.Blockchain = Blockchain;
