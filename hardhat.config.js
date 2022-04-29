require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.13',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/2gXUfHf-A1slsNCIWyHgl3jLS3R1gHaw',
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
}
