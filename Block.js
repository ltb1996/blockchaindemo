// 定义一个区块的类，定义我们此区块链中每个区块的数据结构
class Block {  
    
    // 构造函数，-创建一个新的区块链对象
    constructor(index, previousHash, timestamp, data, hash, nonce) {
        this.index = index;             // 区块索引
        this.previousHash = previousHash;   // 前一个区块的哈希
        this.timestamp = timestamp;    // 时间戳- 创建区块的时间
        this.data = data;      // 区块数据---存储在这个区块链中的实际内容数据
        this.hash = hash;     // 当前区块的hash值，-----是我们这个区块的唯一标识
        this.nonce = nonce;    // 随机数，用于生成哈希or用于挖矿or用于工作量证明的计数器
    }
    
    // 首先定义的第一个创世纪区块，这个创世区块的索引为0，没有前一个区块的哈希，时间戳为创建时的时间，数据为创世区块，哈希为创世区块的哈希，nonce为0
    static get genesis() {
        return new Block(
            0,
            "0",
            1508270000000,
            "first block",
            "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
            604
        )
    }
}

// 导出这个Blockl类，让其他文件可以使用
module.exports = Block;