// 引入Block类，用于创建区块对象
const Block = require('./Block.js');
// 引入Node.js的crypto模块，用于SHA-256哈希计算
const crypto = require('crypto');

// 区块链类 - 管理整个区块链的核心类
class Blockchain {
    // 构造函数 - 初始化一个新的区块链
    constructor() {
        this.blockchain = [Block.genesis]; // 初始化区块链，第一个区块是创世区块
        this.difficulty = 3;               // 挖矿难度 - 要求哈希值前3位必须是0
    }

    // 获取完整的区块链数组
    get() {
        return this.blockchain;
    }

    // 获取区块链中的最新区块（链的末端）
    get latestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    // 验证哈希值是否满足难度要求
    isValidHashDifficulty(hash) {
        // 循环检查哈希值开头有多少个连续的'0'
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== '0') {  // 遇到第一个非'0'字符就停止
                break;
            }
        }
        // 如果前导'0'的数量大于等于难度要求，则有效
        return i >= this.difficulty;
    }

    // 为一个区块对象计算哈希值
    calculateHashForBlock(block) {
        // 从区块对象中解构出所需的属性
        const {
            index,
            previousHash,
            timestamp,
            data,
            nonce
        } = block;
        // 调用通用的哈希计算方法
        return this.calculateHash(index, previousHash, timestamp, data, nonce);
    }

    // 计算哈希值 - 将区块的各个属性组合后进行SHA-256哈希
    calculateHash(index, previousHash, timestamp, data, nonce) {
        // 将所有参数拼接成字符串，然后计算SHA-256哈希值，返回十六进制格式
        return crypto.createHash('sha256').update(index + previousHash + timestamp + data + nonce).digest('hex');
    }

    // 挖矿方法 - 创建新区块并添加到区块链
    mine(data) {
        const newBlock = this.generateNextBlock(data); // 生成新区块（通过工作量证明）
        try {
            this.addBlock(newBlock); // 尝试将新区块添加到链上
        } catch (error) {
            throw error; // 如果添加失败，抛出错误
        }
    }

    // 生成下一个区块 - 执行工作量证明（挖矿）
    generateNextBlock(data) {
        const nextIndex = this.latestBlock.index + 1;      // 新区块的索引 = 最新区块索引 + 1
        const previousHash = this.latestBlock.hash;        // 新区块的前一个哈希 = 最新区块的哈希
        let timestamp = new Date().getTime();              // 获取当前时间戳
        let nonce = 0;                                     // 初始化随机数为0
        // 计算初始哈希值
        let nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);

        // 工作量证明循环 - 不断尝试新的nonce值，直到找到满足难度要求的哈希
        while (!this.isValidHashDifficulty(nextHash)) {
            nonce = nonce + 1;                             // nonce递增
            timestamp = new Date().getTime();              // 更新时间戳
            // 用新的nonce重新计算哈希值
            nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);
        }

        // 找到有效哈希后，创建新区块对象
        const nextBlock = new Block(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nextHash,
            nonce
        );

        return nextBlock; // 返回挖矿完成的新区块

    }

    // 添加区块到区块链
    addBlock(newBlock) {
        // 验证新区块是否有效
        if (this.isValidNextBlock(newBlock, this.latestBlock)) {
            this.blockchain.push(newBlock); // 有效则添加到链的末端
        } else {
            throw "Error: Invalid Block";   // 无效则抛出错误
        }
    }

    // 验证新区块是否是前一个区块的有效后继
    isValidNextBlock(nextBlock, previousBlock) {
        // 重新计算新区块的哈希值，确保没有被篡改
        const nextBlockHash = this.calculateHashForBlock(nextBlock);

        // 检查1: 索引是否连续（新区块索引 = 前区块索引 + 1）
        if (previousBlock.index + 1 !== nextBlock.index) {
            return false;
        // 检查2: 新区块的previousHash是否等于前一个区块的hash
        } else if (previousBlock.hash !== nextBlock.previousHash) {
            return false;
        // 检查3: 重新计算的哈希值是否与区块存储的哈希值一致
        } else if (nextBlockHash !== nextBlock.hash) {
            return false;
        // 检查4: 哈希值是否满足难度要求
        } else if (!this.isValidHashDifficulty(nextBlockHash)) {
            return false;
        } else {
            return true; // 所有检查都通过，区块有效
        }
    }

    // 验证整条区块链是否有效
    isValidChain(chain) {
        // 检查第一个区块是否是创世区块
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis)) {
            return false;
        }

        // 创建临时链，从创世区块开始
        const tempChain = [chain[0]];

        // 逐个验证链上的每个区块
        for (let i = 1; i < chain.length; i++) {
            // 验证当前区块是否是前一个区块的有效后继
            if (this.isValidNextBlock(chain[i], tempChain[i - 1])) {
                tempChain.push(chain[i]); // 有效则添加到临时链
            } else {
                return false; // 发现无效区块，整条链无效
            }
        }
        return true; // 所有区块都验证通过
    }


    // 检查新链是否比当前链更长
    isChainLonger(chain) {
        return chain.length > this.blockchain.length;
    }

    // 替换区块链 - 用于处理区块链分叉，保留最长的有效链
    replaceChain(newChain) {
        // 只有当新链既有效又更长时，才替换当前链
        if (this.isValidChain(newChain) && this.isChainLonger(newChain)) {
            // 深拷贝新链，替换当前区块链
            this.blockchain = JSON.parse(JSON.stringify(newChain));
        } else {
            throw "Error: Invalid Chain"; // 新链无效或不够长，抛出错误
        }
    }
}

// 导出Blockchain类，让其他文件可以使用
module.exports = Blockchain;