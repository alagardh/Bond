require("@nomicfoundation/hardhat-toolbox");
const { MNEMONIC, SEPOLIA_API_KEY, POLYGON_API_KEY, AMOY_API_KEY } = require("./secrets.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "amoy",
  networks: {
    hardhat: {
      // accounts: [HARDHAT],
      // gasPrice: 470000000000,
      chainId: 31337,
    },
    sepolia: {
      url: SEPOLIA_API_KEY,
      network_id: "11155111",
      accounts: [MNEMONIC]
    },
    amoy: {
      url: AMOY_API_KEY,
      network_id: "80002",
      accounts: [MNEMONIC]
    },
    polygon: {
      url: POLYGON_API_KEY,
      network_id: "80001",
      accounts: [MNEMONIC]
    }
  },
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
