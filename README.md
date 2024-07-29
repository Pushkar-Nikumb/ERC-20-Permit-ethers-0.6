
```markdown
# ERC20 Permit Contract

This project demonstrates the usage of the ERC20 Permit contract with Hardhat and ethers@6. It deploys a token contract on the Polygon Mumbai testnet and shows how to interact with it using permit functionality.

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Hardhat
- Infura or QuickNode account for a node service

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Pushkar-Nikumb/ERC-20-Permit-ethers-0.6
   cd ERC20PermitContract
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

## Configuration

1. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add the following variables:

   ```plaintext
   INFURA_NODE_KEY=your_infura_node_key
   CONTRACT_OWNER_PRIVATE_KEY=your_contract_owner_private_key
   CONTRACT_ADDRESS=your_deployed_contract_address
   TOKEN_RECEIVER_PRIVATE_KEY=your_token_receiver_private_key
   ```

2. **Configure Hardhat to use Infura or QuickNode:**

```
    Configure the node given in configuration file 
```
## Deployment

1. **Compile the contract:**

   ```bash
   npx hardhat compile
   ```

2. **Deploy the contract:**

   ```bash
   npx hardhat run scripts/deploy.js --network [NETWORK_NAME]
   ```

## Interacting with the Contract

1. **Call the permit functionality:**

   ```bash
   npx hardhat run scripts/permit.js --network [NETWORK_NAME]
   ```





## Conclusion

This README provides a basic setup to deploy and interact with an ERC20 Permit contract on the Polygon Mumbai testnet using Hardhat and ethers@6. Feel free to extend and customize the project as needed.
```

This `README.md` file includes all the necessary instructions to install, configure, deploy, and interact with the ERC20 Permit contract on the Polygon Mumbai testnet.
