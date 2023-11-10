// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BorrowYourCar is ERC20 {

    // use a event if you want
    // to represent time you can choose block.timestamp

    uint256 querytoken;
    // maybe you need a struct to store car information
    struct Car {
        uint256 model;
        address owner;
        address borrower;
        uint256 borrowUntil;
    }
    
    mapping(uint256 => Car) public cars; // A map from car index to its information,map from 0-n
    uint256 CarNum;
    uint256 initvalue=100;
    uint256 borrowvalue=30;
    // ...
    // TODO add any variables if you want

    constructor() ERC20("CARTOKEN", "CT") {
        _mint(msg.sender, 1000 * (10 ** 18));
        CarNum=0;
    }


    // ...
    // TODO add any logic if you want
    function addCar(uint256 m)public{
        cars[CarNum]=Car(m,msg.sender,address(0),0);
        CarNum=CarNum+1;
    }


    function userOf(uint256 tokenId) public view returns(address){
        if( uint256(cars[tokenId].borrowUntil) >=  block.timestamp){ //car has been borrowed
            return  cars[tokenId].borrower;
        }
        else{
            return address(0);//idle car
        }
    }

    function indexCar(uint256 tokenId)public {
       querytoken=tokenId;
    }
    function returnquery()public view returns(address,uint256,address){

        return (cars[querytoken].owner,cars[querytoken].model,userOf(querytoken));
    }

    function returnCar(uint256 tokenId)public{
        require(msg.sender==userOf(tokenId),"You are not the borrower!");

        cars[tokenId].borrower=address(0);
        cars[tokenId].borrowUntil=0;

    }

    function userExpires(uint256 tokenId) public view returns(uint256){
        return cars[tokenId].borrowUntil;
    }

    function setUser(uint256 tokenId, address user) public{

        require(msg.sender==user,"You must borrow for yourself!");
        require(userOf(tokenId)==address(0),"The car has been borrow!");
        cars[tokenId].borrower=user;
        cars[tokenId].borrowUntil=block.timestamp+300;
        //代币转移
        transfer(cars[tokenId].owner,(borrowvalue* (10 ** 18)));

    }
    function querybalance()public view returns(uint256){
        return balanceOf(msg.sender);
    }

    
    function ownercarlist() public view returns (uint256[] memory, uint256[] memory,address[] memory) {
        uint256[] memory tokenList = new uint256[](CarNum); // 存储 token ID 的动态数组
        uint256[] memory modelList = new uint256[](CarNum); // 存储 model 的动态数组
        address[] memory borrowerList = new address[](CarNum); // 存储 owner 的动态数组
        uint256 count = 0; // 计数器

        for (uint256 i = 0; i < CarNum; i++) {
            if (cars[i].owner==msg.sender) {
                tokenList[count] = i;
                modelList[count] = cars[i].model;
                borrowerList[count]= cars[i].borrower;
                count++;
            }
        }

        // 创建新的动态数组，只保存实际使用的部分
        uint256[] memory finaltokenList = new uint256[](count); // 存储 token ID 的动态数组
        uint256[] memory finalmodelList = new uint256[](count); // 存储 model 的动态数组
        address[] memory finalborrowerList = new address[](count); // 存储 owner 的动态数组



        // 将数据从临时动态数组复制到最终的动态数组中
        for (uint256 j = 0; j < count; j++) {
            finaltokenList[j] = tokenList[j];
            finalmodelList[j] = modelList[j];
            finalborrowerList[j]=borrowerList[j];
        }

        return (finaltokenList, finalmodelList,finalborrowerList);
    }


    

    function borrowlist() public view returns (uint256[] memory, uint256[] memory,address[] memory) {
        uint256[] memory tokenList = new uint256[](CarNum); // 存储 token ID 的动态数组
        uint256[] memory modelList = new uint256[](CarNum); // 存储 model 的动态数组
        address[] memory ownerList = new address[](CarNum); // 存储 owner 的动态数组
        uint256 count = 0; // 计数器

        for (uint256 i = 0; i < CarNum; i++) {
            if (userOf(i) == msg.sender) {
                tokenList[count] = i;
                modelList[count] = cars[i].model;
                ownerList[count]= cars[i].owner;
                count++;
            }
        }

        // 创建新的动态数组，只保存实际使用的部分
        uint256[] memory finaltokenList = new uint256[](count); // 存储 token ID 的动态数组
        uint256[] memory finalmodelList = new uint256[](count); // 存储 model 的动态数组
        address[] memory finalownerList = new address[](count); // 存储 owner 的动态数组



        // 将数据从临时动态数组复制到最终的动态数组中
        for (uint256 j = 0; j < count; j++) {
            finaltokenList[j] = tokenList[j];
            finalmodelList[j] = modelList[j];
            finalownerList[j]=ownerList[j];
        }

        return (finaltokenList, finalmodelList,finalownerList);
    }

    function idlelist() public view returns (uint256[] memory, uint256[] memory,address[] memory) {
        uint256[] memory tokenList = new uint256[](CarNum); // 存储 token ID 的动态数组
        uint256[] memory modelList = new uint256[](CarNum); // 存储 model 的动态数组
        address[] memory ownerList = new address[](CarNum); // 存储 owner 的动态数组
        uint256 count = 0; // 计数器

        for (uint256 i = 0; i < CarNum; i++) {
            if (userOf(i) == address(0)) {
                tokenList[count] = i;
                modelList[count] = cars[i].model;
                ownerList[count]= cars[i].owner;
                count++;
            }
        }

        // 创建新的动态数组，只保存实际使用的部分
        uint256[] memory finaltokenList = new uint256[](count); // 存储 token ID 的动态数组
        uint256[] memory finalmodelList = new uint256[](count); // 存储 model 的动态数组
        address[] memory finalownerList = new address[](count); // 存储 owner 的动态数组



        // 将数据从临时动态数组复制到最终的动态数组中
        for (uint256 j = 0; j < count; j++) {
            finaltokenList[j] = tokenList[j];
            finalmodelList[j] = modelList[j];
            finalownerList[j]=ownerList[j];
        }

        return (finaltokenList, finalmodelList,finalownerList);
    }
}