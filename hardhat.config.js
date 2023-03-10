require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { privateKey_ContractOwner, RPC_bscTestnet } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    bsc: {
      url: RPC_bscTestnet,
      accounts: [`${privateKey_ContractOwner}`],
    },
  },
};
