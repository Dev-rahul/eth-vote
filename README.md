# EthVote - Zero-Knowledge Voting System

A decentralized voting application built on Ethereum that uses zero-knowledge proofs to ensure voter privacy and prevent double voting. The system utilizes Merkle trees and zk-SNARKs to maintain anonymity while ensuring the integrity of the voting process.

## 📖 Description

EthVote represents a revolutionary approach to digital voting that addresses the fundamental challenges of traditional voting systems: **privacy**, **transparency**, and **trust**. By leveraging the power of zero-knowledge cryptography and blockchain technology, EthVote creates a voting environment where:

### The Problem It Solves

Traditional voting systems, whether physical or digital, face critical challenges:
- **Privacy Concerns**: Voters worry about their choices being tracked or revealed
- **Double Voting**: Preventing users from voting multiple times while maintaining anonymity
- **Centralized Control**: Single points of failure and potential manipulation
- **Transparency vs Privacy**: The conflict between verifiable results and voter anonymity
- **Trust Issues**: Reliance on centralized authorities and opaque processes

### The Solution

EthVote eliminates these concerns through innovative cryptographic techniques:

**🔒 Privacy-First Design**: Using zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge), voters can prove their eligibility and cast votes without revealing their identity or vote choice. The system knows a valid vote was cast but cannot trace it back to the voter.

**🌳 Merkle Tree Architecture**: Voter commitments are stored in a Merkle tree, enabling efficient verification of voting rights without maintaining a public list of voters. This structure allows for scalable anonymous voting.

**🛡️ Double Voting Prevention**: Through cryptographic nullifiers, the system ensures each registered voter can only vote once. The nullifier is derived from the voter's secret but doesn't reveal the voter's identity.

**⚖️ Decentralized Governance**: The system operates on Ethereum's decentralized network, eliminating single points of failure and ensuring transparency through immutable smart contracts.

**🔍 Verifiable Results**: All votes are publicly verifiable on the blockchain, allowing anyone to audit the results while maintaining individual voter privacy.

### Real-World Applications

EthVote can be adapted for various democratic processes:

- **Corporate Governance**: Board elections and shareholder voting
- **Academic Institutions**: Student government and faculty decisions
- **Community Organizations**: Member polls and leadership selection
- **Public Referendums**: Municipal decisions and citizen initiatives
- **Token Governance**: DAO voting and protocol governance
- **Professional Associations**: Leadership elections and policy decisions

### Technical Innovation

The system combines several cutting-edge technologies:

- **Zero-Knowledge Proofs**: Enables privacy-preserving authentication
- **Merkle Trees**: Provides efficient and scalable voter registration
- **Smart Contracts**: Ensures transparent and tamper-proof vote counting
- **Cryptographic Nullifiers**: Prevents double voting without compromising anonymity
- **Groth16 Protocol**: Implements efficient zero-knowledge proof verification

### Security Guarantees

EthVote provides mathematical guarantees for:
- **Voter Privacy**: Zero-knowledge proofs ensure vote secrecy
- **Eligibility Verification**: Only registered voters can participate
- **Double Voting Prevention**: Cryptographic nullifiers prevent repeat voting
- **Result Integrity**: Blockchain immutability ensures accurate counting
- **Auditability**: All proofs are publicly verifiable

This system represents a significant advancement in digital democracy, providing a foundation for trustless, private, and verifiable voting that can scale to support various organizational needs while maintaining the highest standards of security and privacy.

## 🚀 Features

- **Anonymous Voting**: Uses zero-knowledge proofs to maintain voter privacy
- **Double Voting Prevention**: Merkle tree-based nullifier system prevents users from voting twice
- **Validator System**: Controlled by validators who can register voters and manage polls
- **Real-time Results**: Live vote counting and results display
- **MetaMask Integration**: Seamless wallet connectivity
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## 🛠️ Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Smart contracts on Ethereum
- **Zero-Knowledge**: Circom circuits with zk-SNARKs (Groth16)
- **Wallet**: MetaMask integration via ethers.js
- **Development**: Hardhat for smart contract development and testing

## 📁 Project Structure

```
├── contracts/                 # Solidity smart contracts
│   ├── ZKTreeVote.sol        # Main voting contract
│   └── Verifier.sol          # ZK proof verifier
├── src/
│   ├── components/           # React components
│   │   ├── Home.js          # Main dashboard
│   │   ├── Register.js      # Voter registration
│   │   ├── Vote.js          # Voting interface
│   │   ├── Results.js       # Vote results
│   │   ├── Validator.js     # Validator tools
│   │   └── Control.js       # Poll control panel
│   └── contexts/
│       └── AppContext.js    # React context for state management
├── scripts/
│   ├── deploy.ts            # Contract deployment
│   └── prepare.sh           # ZK circuit preparation
└── keys/                    # ZK proving keys
```

## 🔧 Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Hardhat
- snarkjs

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd eth-vote
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Prepare ZK Circuits

```bash
npm run prepare
```

This will:
- Set up the zk-SNARK proving keys
- Generate the Solidity verifier contract
- Copy necessary files to the correct locations

### 4. Start Local Blockchain

```bash
npx hardhat node
```

### 5. Deploy Contracts

```bash
npm run deploy
```

### 6. Start the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📱 How to Use

### For Voters:

1. **Connect Wallet**: Connect your MetaMask wallet
2. **Register**: Generate a commitment and get it registered by a validator
3. **Vote**: Cast your vote anonymously using zero-knowledge proofs
4. **View Results**: Check real-time voting results

### For Validators:

1. **Register Voters**: Add voter commitments to the Merkle tree
2. **Control Polls**: Start and stop voting periods
3. **Manage System**: Oversee the voting process

## 🔒 Privacy & Security

- **Zero-Knowledge Proofs**: Voters can prove their eligibility without revealing their identity
- **Merkle Tree**: Efficient storage and verification of voter commitments
- **Nullifiers**: Prevent double voting while maintaining anonymity
- **On-chain Verification**: All proofs are verified on the blockchain

## 📊 Voting Process

1. **Commitment Generation**: Voters generate a secret commitment
2. **Registration**: Validators register the commitment in the Merkle tree
3. **Proof Generation**: When voting, a zero-knowledge proof is generated
4. **Verification**: The smart contract verifies the proof and records the vote
5. **Nullifier**: A nullifier prevents the same commitment from voting twice

## 🔧 Smart Contract Functions

### ZKTreeVote.sol

- `registerValidator(address)`: Add a new validator
- `isValidator(address)`: Check if address is a validator
- `startVoting()`: Begin voting period
- `stopVoting()`: End voting period
- `registerCommitment(uint256, uint256)`: Register voter commitment
- `vote(uint, uint256, uint256, uint[2], uint[2][2], uint[2])`: Cast vote with ZK proof
- `getOptionCounter(uint)`: Get vote count for option

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Deploy to Testnet

1. Update `hardhat.config.ts` with testnet configuration
2. Run deployment script with network flag:

```bash
npx hardhat run scripts/deploy.ts --network <network-name>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs](https://github.com/iden3/snarkjs)
- [Hardhat](https://hardhat.org/)
- [zk-merkle-tree](https://github.com/privacy-scaling-explorations/zk-merkle-tree)

## ⚠️ Disclaimer

This is a demonstration project. Before using in production, ensure proper security audits and testing are conducted.
