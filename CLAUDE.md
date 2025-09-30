# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple blockchain demonstration project that implements basic blockchain functionality including proof-of-work mining, block validation, and chain management. The project uses Node.js and includes a CLI interface via the Vorpal library.

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

# Run tests (currently no tests implemented)
npm test
```

## Development Notes

- The project references `index.js` as main entry point in package.json, but this file doesn't exist
- No build process or linting configuration is currently set up
- The Vorpal dependency suggests this was intended to have a CLI interface, but no CLI implementation exists
- Mining difficulty is hardcoded to 3 in `Blockchain.js:7`
- The genesis block is predefined with a specific hash and nonce in `Block.js:11-20`

## Blockchain Implementation Details

- Uses SHA-256 for hashing (Node.js crypto module)
- Proof-of-work requires hash to start with difficulty number of zeros
- Block validation checks index continuity, hash integrity, and proof-of-work
- Chain validation ensures genesis block matches and all blocks are valid
- Chain replacement only occurs if new chain is longer and valid