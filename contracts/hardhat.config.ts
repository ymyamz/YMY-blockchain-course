import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      // rpc url, change it according to your ganache configuration
      url: "HTTP://172.18.64.1:8545",
      // the private key of signers, change it according to your ganache user
      accounts: [
        "0xa44443d008878453f5c25367b6aedb944ca8662bcd4add44597cffc5fd03ff5c",
      ],
    },
  },
};

export default config;
