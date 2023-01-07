require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('./tasks/blockNumber')

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
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
  },
  solidity: '0.8.17',
  etherscan: {
    apiKey: ETHERSCAN_API,
  },
}
