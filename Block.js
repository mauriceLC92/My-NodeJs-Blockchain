
// Class with a constructor for block data model
class Block {
    constructor(data) {
        this.hash = '';
        this.height = 0;
        this.body = data;
        this.timeStamp = '';
        this.previousblockhash = '';
    }
}

module.exports.Block = Block; 