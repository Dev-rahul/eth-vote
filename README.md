# EthVote - Zero-Knowledge Voting System

A decentralized voting application built on Ethereum that uses zero-knowledge proofs to ensure voter privacy and prevent double voting. The system utilizes Merkle trees and zk-SNARKs to maintain anonymity while ensuring the integrity of the voting process.

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
