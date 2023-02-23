require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const { PRIVATE_KEY_OWNER, RPC_BSC_TESTNET } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    bsc: {
      url: RPC_BSC_TESTNET,
      accounts: [`0x${PRIVATE_KEY_OWNER}`],
    },
  },
};
