const hre = require('hardhat')
const inquirer = require('inquirer')

const contracts = [
  'UserContract',
  'CertificatesContract'
]

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'contract',
      pageSize: contracts.length + 2,
      message: 'Select contract:',
      choices: [...contracts]
    }
  ])

  console.log(
    'Deploying contract with the account:',
    deployer.address,
  )

  const Contract = await hre.ethers.getContractFactory(answer.contract)
  const contract = await Contract.deploy()

  await contract.deployed()

  console.log(`${answer.contract} deployed to:`, contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
