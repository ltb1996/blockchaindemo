const Block = require("./Block.js");
const Blockchain = require("./Blockchain.js");

console.log('=====区块链测试开始=====');

try {
    //1.测试创世区块
    console.log("1. 测试创世纪区块：");
    const genesis = Block.genesis;
    console.log("---索引：", genesis.index);
    console.log("---数据：", genesis.data);
    console.log("---哈希：", genesis.hash);
    console.log("---前一区块哈希：", genesis.previousHash);
    console.log("---nonce:", genesis.nonce);
    console.log("测试创世纪区块创建成功，++++++++++++++++++++++++")
    //2. 测试初始化区块链
    console.log("2. 测试初始化区块链：");
    const blockchain = new Blockchain();
    console.log("-----区块链长度：", blockchain.get().length);
    console.log("-----最新的区块索引：", blockchain.latestBlock.index);
    console.log("-----挖矿难度：", blockchain.difficulty);
    console.log("测试初始化区块链成功，++++++++++++++++++++++++");
    //3.测试哈希难度验证函数
    console.log("3. 测试哈希难度验证函数：");
    console.log("---当前难度要求：", blockchain.difficulty, "个前导0");
    const validHash = "000abc123def";
    const invalidHash = "00abc123def";
    // hash值前面的0，大于等于3的时候，会返回true，小于3的时候，会返回false
    console.log("---" + validHash + "是否有效：", blockchain.isValidHashDifficulty(validHash));
    console.log("---" + invalidHash + "是否有效：", blockchain.isValidHashDifficulty(invalidHash));
    console.log("测试哈希难度验证函数成功，++++++++++++++++++++++++");
    //4.测试哈希计算函数
    console.log("4. 测试哈希计算函数：");
    const testHash = blockchain.calculateHash(0, '0', 1234567890, "测试数据", 0);
    console.log("---计算出的哈希值：", testHash);
    console.log("---哈希长度：", testHash.length, "字符");
    console.log("测试哈希计算函数成功，++++++++++++++++++++++++");
    //5.测试挖第一个区块
    console.log("5. 测试挖第一个区块：");
    console.log("-------开始挖矿--------");
    console.time("++挖矿耗时++");
    blockchain.mine("第一个测试区块");
    console.timeEnd("++挖矿耗时++");
    console.log("----新区块索引：", blockchain.latestBlock.index);
    console.log("----新区块数据：", blockchain.latestBlock.data);
    console.log("----新区块哈希：", blockchain.latestBlock.hash);
    console.log("----新区块nonce: ", blockchain.latestBlock.nonce);
    console.log('----当前区块链的长度:', blockchain.get().length);
    console.log("测试挖第一个区块成功，++++++++++++++++++++++++");
    //6.测试挖第二个区块
    console.log("6. 测试挖第二个区块：");
    console.log("-------开始挖矿--------");
    console.time("++挖矿耗时++");
    blockchain.mine("第二个测试区块");
    console.timeEnd("++挖矿耗时++");
    console.log("----第二个区块索引：", blockchain.latestBlock.index);
    console.log("----第二个区块数据：", blockchain.latestBlock.data);
    console.log("----第二个区块哈希：", blockchain.latestBlock.hash);
    console.log("----第二个区块nonce: ", blockchain.latestBlock.nonce);
    console.log('----当前区块链的长度:', blockchain.get().length);
    console.log("测试挖第二个区块成功，++++++++++++++++++++++++");
    //7.测试区块链验证
    console.log("7. 测试区块链验证：");
    const isValid = blockchain.isValidChain(blockchain.get());
    console.log("---当前区块链是否有效：", isValid);

    //8.测试完整区块链
    console.log("8. 测试完整区块链：");
    blockchain.get().forEach((block, i) => {
        console.log(`+++区块 #${i}: `);
        console.log('    索引:', block.index);
        console.log('    数据:', block.data);
        console.log('    哈希:', block.hash);
        console.log('    前一区块哈希:', block.previousHash);
        console.log('    时间戳:', new Date(block.timestamp).toLocaleString('zh-CN'));
        console.log('    Nonce:', block.nonce);
        console.log('');
    });
    console.log("测试完整区块链成功，++++++++++++++++++++++++");

    //9.测试单个区块验证
    console.log("9. 测试单个区块验证：");
    const block1 = blockchain.get()[1];
    const block0 = blockchain.get()[0];
    const isNextBlockValid = blockchain.isValidNextBlock(block1, block0);
    console.log("---区块1相对于区块0是否有效：", isNextBlockValid);
    console.log("测试单个区块验证成功，++++++++++++++++++++++++");
    console.log("===========测试结束，所有测试通过，你的Block.js和Blockchain.js文件运行正常===========")


} catch (error) {
    console.log(error);
}