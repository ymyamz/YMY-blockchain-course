import Addresses from './contract-addresses.json'
import BorrowYourCar from './abis/BorrowYourCar.json'

const Web3 = require('web3');

// @ts-ignore
// 创建web3实例
// 可以阅读获取更多信息https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://172.18.64.1:8545"))

// 修改地址为部署的合约地址
const BorrowYourCarAddress = Addresses.BorrowYourCar
const BorrowYourCarABI = BorrowYourCar.abi

// 获取合约实例
const BorrowYourCarContract = new web3.eth.Contract(BorrowYourCarABI, BorrowYourCarAddress);


// 导出web3实例和其它部署的合约
export {web3, BorrowYourCarContract}