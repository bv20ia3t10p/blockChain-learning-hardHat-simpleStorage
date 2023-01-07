require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

// @type import('hardhat/config').HardhatUserConfig
// yarn hardhat run scripts/deploy.js --network hardhat to run the code specifically on hardhat network
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API = process.env.ETHERSCAN_API

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
}
