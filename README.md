# 汽车租借服务平台

姓名：叶沐阳	学号：3210104095

## 项目介绍：

汽车租借服务平台，允许用户使用平台发行的CT代币对NFT汽车进行租借。

- 创建一个合约，在合约中发行NFT集合，每个NFT代表一辆汽车。给部分用户测试领取部分汽车NFT，用于后面的测试。
- 在网站中，默认每个用户的汽车都可以被借用。每个用户可以： 
   1. 查看自己拥有的汽车列表。查看当前还没有被借用的汽车列表。
   2. 查询一辆汽车的主人，以及该汽车当前的借用者（如果有）。
   3. 选择并借用某辆还没有被借用的汽车一定时间。
   4. 使用自己发行的积分(ERC20)完成付费租赁汽车的流程。

本项目仓库：https://github.com/ymyamz/YMY-blockchain-course

## 如何运行

补充如何完整运行你的应用。

1. 在本地启动ganache应用。本项目的ganache默认运行在HTTP://172.18.64.1:8545端口，如需更改，请运行在`./contracts/hardhat.config.ts`中更改相关配置。

2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```

3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
    ```

4. 将合约在ganache网络中运行。

    ```
    npx hardhat run scripts/deploy.ts --network ganache
    ```

    复制输出的合约部署地址：![image-20231023142146458](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231023142146458.png)

5. 运行前端，将以上复制的地址粘贴至`./frontend/src/utils/contract-addresses.json`

6. 在 `./frontend` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```

7. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm run start
    ```

​	8. 点击连接钱包，与你的MetaMask钱包连接；请导入多个账号至MetaMask钱包中，通过切换账号实现多个账号租赁服务；本项目初始化默认发行1000CT代币进入部署合约的账户，请在MetaMask中转入其他测试账户用于测试。

## 功能实现

### 总体界面

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103003553524.png" alt="image-20231103003553524" style="zoom: 67%;" />

### 功能一：添加车辆

初始页面中没有车辆，请通过连接账号，选择一个车型（支持4种车型），导入车辆。切换不同的MetaMask钱包账户来导入不同的车辆，一个账号支持导入多辆汽车。导入的汽车会显示在空闲汽车列表。

### 功能二：查询车辆

每辆车都有一个独特的tokenID，输入tokenID，查询该车的车主，租借人，车型。

### 功能三：查询本账户的车辆和租赁的车辆

点击我的车辆列表下的两个按钮，分别显示当前账户拥有的车辆和租赁的车辆。

### 功能四：通过CT代币租赁车辆

空闲列表中，显示目前所有空闲的车辆，点击租借按钮，租借该车。默认租赁时间为300秒（方便进行测试），过时后自动归还。

本项目发行CT代币，租借车辆消费30CT。

## 项目运行截图

放一些项目运行截图。

项目运行成功的关键页面和流程截图。主要包括操作流程以及和区块链交互的截图。

#### 项目环境配置

1，ganache启动

![image-20231102202018193](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231102202018193.png)

2，后端部署在ganache本地区块链网络，在ganache中显示合约创建成功。

![image-20231103003744167](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103003744167.png)

![image-20231103003853001](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103003853001.png)

3，通过启动npm run start启动前端

![image-20231102202302717](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231102202302717.png)



#### 连接钱包

在MetaMask中连接本地Ganache测试网，导入ganache中的几个账号用于测试。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103003815911.png" alt="image-20231103003815911" style="zoom: 50%;" />

其中，部署合约的账号中初始拥有1000CT代币，可以发送给其他测试账户。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004307435.png" alt="image-20231103004307435" style="zoom: 50%;" />

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004326595.png" alt="image-20231103004326595" style="zoom:50%;" />

点击连接钱包按钮，当前用户变化，与MetaMask中相同。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004439395.png" alt="image-20231103004439395" style="zoom: 67%;" />

#### 导入新汽车

选择汽车型号，点击导入，为当前账号导入指定型号的汽车。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004507949.png" alt="image-20231103004507949" style="zoom: 70%;" />

弹窗提示导入成功，显示在下方的空闲汽车列表。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004600181.png" alt="image-20231103004600181" style="zoom:67%;" />

在ganache中查看，调用addCar函数的记录。

#### ![image-20231103004634844](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004634844.png)

点击我的车辆列表-拥有的车辆可显示当前帐号导入的车辆。能显示车辆的唯一性id和当前租借人（目前未被租借）。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004648720.png" alt="image-20231103004648720" style="zoom:67%;" />

#### 租借车辆

切换账号。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004734629.png" alt="image-20231103004734629" style="zoom:67%;" />

点击租借按钮，跳出弹窗。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004754263.png" alt="image-20231103004754263" style="zoom:67%;" />

车辆从空闲汽车列表消失，可以点击我的车辆列表-租借的车辆查看当前租借的车辆。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103004812977.png" alt="image-20231103004812977" style="zoom:67%;" />

车辆设置为在借出5分钟后自动归还（方便测试）。

本账户代币由70CT变为40CT。(-30CT)<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103005738502.png" alt="image-20231103005738502" style="zoom:67%;" />

租借车辆的车主代币由130CT变为160CT。（+30CT）

![image-20231103005356527](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103005356527.png)

该账户调用borrow函数的区块链记录。

![image-20231103005647296](https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103005647296.png)

#### 查询指定车辆

可通过车辆token(唯一性id)查询车辆车主、租借人、车型等。

<img src="https://github.com/ymyamz/YMY-blockchain-course/tree/main/image-src/image-20231103010310786.png" alt="image-20231103010310786" style="zoom:67%;" />

## 参考内容

- 课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。

- ERC-4907 [参考实现](https://eips.ethereum.org/EIPS/eip-4907)

