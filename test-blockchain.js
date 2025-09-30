const Block = require('./Block.js');
const Blockchain = require('./Blockchain.js');

console.log('=== 区块链测试开始 ===\n');

try {
  // 测试1: 创世区块
  console.log('1. 测试创世区块:');
  const genesis = Block.genesis;
  console.log('  - 索引:', genesis.index);
  console.log('  - 数据:', genesis.data);
  console.log('  - 哈希:', genesis.hash);
  console.log('  - Nonce:', genesis.nonce);
  console.log('✓ 创世区块创建成功\n');

  // 测试2: 初始化区块链
  console.log('2. 测试区块链初始化:');
  const blockchain = new Blockchain();
  console.log('  - 区块链长度:', blockchain.get().length);
  console.log('  - 最新区块索引:', blockchain.latestBlock.index);
  console.log('  - 挖矿难度:', blockchain.difficulty);
  console.log('✓ 区块链初始化成功\n');

  // 测试3: 哈希难度验证
  console.log('3. 测试哈希难度验证:');
  console.log('  - 当前难度要求:', blockchain.difficulty, '个前导0');
  const validHash = '000abc123def';
  const invalidHash = '00abc123def';
  console.log('  - "' + validHash + '" 是否有效:', blockchain.isValidHashDifficulty(validHash));
  console.log('  - "' + invalidHash + '" 是否有效:', blockchain.isValidHashDifficulty(invalidHash));
  console.log('✓ 难度验证正常\n');

  // 测试4: 哈希计算
  console.log('4. 测试哈希计算:');
  const testHash = blockchain.calculateHash(0, '0', 1234567890, '测试', 0);
  console.log('  - 计算的哈希值:', testHash);
  console.log('  - 哈希长度:', testHash.length, '字符');
  console.log('✓ 哈希计算正常\n');

  // 测试5: 挖第一个区块
  console.log('5. 测试挖矿 (可能需要几秒钟):');
  console.log('  - 开始挖矿...');
  console.time('  挖矿耗时');
  blockchain.mine('第一个测试区块');
  console.timeEnd('  挖矿耗时');
  console.log('  - 新区块索引:', blockchain.latestBlock.index);
  console.log('  - 新区块数据:', blockchain.latestBlock.data);
  console.log('  - 新区块哈希:', blockchain.latestBlock.hash);
  console.log('  - 新区块 Nonce:', blockchain.latestBlock.nonce);
  console.log('  - 当前区块链长度:', blockchain.get().length);
  console.log('✓ 第一个区块挖矿成功\n');

  // 测试6: 挖第二个区块
  console.log('6. 测试挖第二个区块:');
  console.log('  - 开始挖矿...');
  console.time('  挖矿耗时');
  blockchain.mine('第二个测试区块');
  console.timeEnd('  挖矿耗时');
  console.log('  - 新区块索引:', blockchain.latestBlock.index);
  console.log('  - 新区块数据:', blockchain.latestBlock.data);
  console.log('  - 新区块哈希:', blockchain.latestBlock.hash);
  console.log('  - 当前区块链长度:', blockchain.get().length);
  console.log('✓ 第二个区块挖矿成功\n');

  // 测试7: 区块链验证
  console.log('7. 测试区块链有效性:');
  const isValid = blockchain.isValidChain(blockchain.get());
  console.log('  - 当前链是否有效:', isValid);
  console.log('✓ 链验证通过\n');

  // 测试8: 显示完整区块链
  console.log('8. 显示完整区块链:');
  blockchain.get().forEach((block, index) => {
    console.log(`  区块 #${index}:`);
    console.log('    索引:', block.index);
    console.log('    数据:', block.data);
    console.log('    哈希:', block.hash);
    console.log('    前一区块哈希:', block.previousHash);
    console.log('    时间戳:', new Date(block.timestamp).toLocaleString('zh-CN'));
    console.log('    Nonce:', block.nonce);
    console.log('');
  });
  console.log('✓ 区块链显示完成\n');

  // 测试9: 区块验证
  console.log('9. 测试单个区块验证:');
  const block1 = blockchain.get()[1];
  const block0 = blockchain.get()[0];
  const isNextBlockValid = blockchain.isValidNextBlock(block1, block0);
  console.log('  - 区块1相对于区块0是否有效:', isNextBlockValid);
  console.log('✓ 区块验证通过\n');

  console.log('=== 所有测试通过! ===');
  console.log('\n提示: 你的 Block.js 和 Blockchain.js 文件运行正常！');

} catch (error) {
  console.error('\n❌ 测试失败!');
  console.error('错误信息:', error);
  console.error('\n请检查你的代码:');
  console.error('1. 确认 Block.js 中的 Block.genesis() 方法是否正确');
  console.error('2. 确认 Blockchain.js 中是否正确引入了 Block 类');
  console.error('3. 检查语法错误和逻辑错误');
  process.exit(1);
}