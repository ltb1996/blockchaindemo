# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple blockchain demonstration project that implements basic blockchain functionality including proof-of-work mining, block validation, and chain management. The project uses Node.js and includes a test file for verifying blockchain operations.

## Architecture

The codebase consists of two core classes:

1. **Block** (`Block.js`): Defines the structure of a blockchain block with properties:
   - `index`: Block position in the chain
   - `previousHash`: Hash of the previous block
   - `timestamp`: Block creation time
   - `data`: Block payload data
   - `hash`: Current block's hash
   - `nonce`: Proof-of-work nonce

2. **Blockchain** (`Blockchain.js`): Implements the blockchain logic with:
   - Proof-of-work mining with configurable difficulty (default: 3)
   - Block validation and chain verification
   - Chain replacement for consensus
   - SHA-256 hashing via Node.js crypto module

## Key Commands

```bash
# Install dependencies
npm install

# Run the test file to verify blockchain functionality
node test-blockchain.js

# Note: npm test is not configured yet
```

## Development Notes

- The project references `index.js` as main entry point in package.json, but this file doesn't exist
- `test-blockchain.js` provides comprehensive testing of all blockchain features including mining, validation, and chain management
- Mining difficulty is hardcoded to 3 in `Blockchain.js:7` (requires hash to start with 3 zeros)
- The genesis block is predefined with a specific hash and nonce in `Block.js:11-20`

## Known Issues

The following are code quality issues that don't affect functionality but should be considered for improvements:

- Error handling uses string literals instead of Error objects (Blockchain.js:81, 127)
- `isValidHashDifficulty` uses `var` instead of `let` for loop variable (Blockchain.js:19)
- Data serialization in `calculateHash` uses string concatenation which may not work correctly if data is an object