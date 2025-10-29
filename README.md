# Blockchain Demo

一个基于 Node.js 实现的简易区块链演示项目，用于学习和理解区块链的基本原理。

## 项目结构

```
.
├── Block.js              # 区块定义
├── Blockchain.js         # 区块链核心逻辑
├── P2p.js                # P2P网络通信
├── cli.js                # 命令行界面
├── messages-type.js      # 消息类型定义
├── messages.js           # 消息处理
├── test-blockchain.js    # 区块链测试
├── test-p2p.js           # P2P网络测试
├── test-messages.js      # 消息处理测试
├── test-cli.js           # CLI交互测试
├── integration-test.js   # 集成测试
└── package.json          # 项目配置
```

## 安装依赖

```bash
npm install
```

## 运行测试

### 运行所有测试
```bash
npm test
```

### 运行特定模块测试
```bash
npm run test:blockchain  # 区块链测试
npm run test:p2p         # P2P网络测试
npm run test:messages    # 消息处理测试
npm run test:cli         # CLI交互测试
```

## CLI命令

运行CLI测试：
```bash
npm run test:cli
```

在CLI中可以使用的命令：
- `help` - 查看帮助
- `blockchain` 或 `bc` - 查看区块链
- `peers` 或 `p` - 查看连接的节点
- `mine <data>` 或 `m <data>` - 挖矿
- `open <port>` 或 `o <port>` - 开启端口
- `connect <host> <port>` 或 `c <host> <port>` - 连接节点
- `discover` 或 `d` - 发现节点

## 核心功能

1. **区块创建**: 支持创建包含索引、时间戳、数据、前一区块哈希和自身哈希的区块
2. **区块链构建**: 将多个区块按顺序链接，形成一条完整的链
3. **哈希验证**: 使用SHA-256加密哈希确保数据完整性
4. **链的验证**: 提供方法检查区块链是否被篡改
5. **P2P网络**: 支持节点间通信和区块链同步
6. **命令行交互**: 通过CLI命令操作区块链

## 技术栈

- Node.js
- Vorpal (命令行界面)
- TCP Socket (P2P通信)