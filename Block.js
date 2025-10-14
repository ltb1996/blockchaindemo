class Block {    
    constructor(index, previousHash, timestamp, data, hash, nonce) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.nonce = nonce;
    }

    static get genesis() {
        return new Block(
            0,                              // 索引为0，表示这是第一个区块
            "0",                            // 没有前一个区块，所以用"0"表示
            1508270000000,                  // 固定的创建时间戳
            "first block",                  // 创世区块的数据内容
            "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf", // 预先计算好的哈希值（以000开头，满足难度要求）
            604                             // 通过挖矿找到的随机数值
        )
    }
}

module.exports = Block;