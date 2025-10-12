// 区块类 - 定义区块链中每个区块的数据结构
class Block {
    // 构造函数 - 创建一个新的区块对象
    constructor(index, previousHash, timestamp, data, hash, nonce) {
        this.index = index;               // 区块索引 - 表示这是链上的第几个区块
        this.previousHash = previousHash; // 前一个区块的哈希值 - 用于将区块链接在一起
        this.timestamp = timestamp;       // 时间戳 - 记录区块创建的时间（毫秒）
        this.data = data;                 // 区块数据 - 存储在这个区块中的实际内容
        this.hash = hash;                 // 当前区块的哈希值 - 区块的唯一标识符
        this.nonce = nonce;              // 随机数 - 用于工作量证明的计数器
    }

    // 静态属性 - 获取创世区块（区块链的第一个区块）
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

// 导出Block类，让其他文件可以使用
module.exports = Block;