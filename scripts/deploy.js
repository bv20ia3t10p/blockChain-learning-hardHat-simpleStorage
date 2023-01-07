//npm init -y
// npm install --save-dev hardhat
// npx hardhat
// npm install --save-dev @nomicfoundation/hardhat-toolbox
// artifacts folder contains compiled code
// get rpcurl from chainlink.org

const { ethers, run, network } = require('hardhat')
require('dotenv').config()

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  console.log('Deploying contract')
  const SimpleStorage = await SimpleStorageFactory.deploy()
  await SimpleStorage.deployed()
  //yarn hardhat run scripts/deploy.js
  console.log(`Deployed contract to :${SimpleStorage.address}`)
  console.log(network.config)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API) {
    await SimpleStorage.deployTransaction.wait(6)
    await verify(SimpleStorage.address, [])
  }
  const currentValue = await SimpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  //Update the current value
  const transactionResponse = await SimpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await SimpleStorage.retrieve()
  console.log(`Updated value is: ${updatedValue}`)
}

//delete artifact/cache folder if compile issues arise

async function verify(contractAddress, args) {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.massage.toLowerCase().includes('already verified'))
      console.log('already verified')
    else console.log(e)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
