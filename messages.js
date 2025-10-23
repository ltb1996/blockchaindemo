const messageType = require('./messages-type.js');
const {
    REQUEST_LATEST_BLOCK,
    RECEIVE_LATEST_BLOCK,
    REQUEST_LATEST_BLOCKCHAIN,
    RECEIVE_LATEST_BLOCKCHAIN
} = messageType;
class Messages {
    // 请求最新区块的消息函数
    static getLatestBlock() {
        return {
            type: REQUEST_LATEST_BLOCK,
        };
    }
    // 相应最新区块的消息函数（将最新的区块发送给请求方）
    static sendLatestBlock(block) {
        return {
            type: RECEIVE_LATEST_BLOCK,
            data: block
        };
    }
    // 请求整个区块链的消息函数
    static getBlockchain() {
        return {
            type: REQUEST_LATEST_BLOCKCHAIN,
        };
    }
    // 响应整个区块链的消息函数（将整个区块链发送给请求方）
    static sendBlockchain(blockchain) {
        return {
            type: RECEIVE_LATEST_BLOCKCHAIN,
            data: blockchain
        };
    }
}


module.exports = Messages;