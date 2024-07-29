require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
// https://coinsbench.com/guide-to-deploy-verify-smart-contract-on-amoy-using-hardhat-1b4f26a2dc78, get deployment on amoy test nets
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "polygonAmoy",
  networks: {
    hardhat: {},
    polygonAmoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_NODE_KEY}`,
      accounts: [`0x${process.env.CONTRACT_OWNER_PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};