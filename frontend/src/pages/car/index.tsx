import React, { useEffect,useState } from 'react';

import carAImage from './images/a.jpeg';
import carBImage from './images/b.jpg';
import carCImage from './images/c.jpg';
import carDImage from './images/d.jpeg';
import header from './images/header.jpg'
import './index.css';
import {BorrowYourCarContract, web3} from "../../utils/contracts"; 

interface Car {
  model: string;
  name: string;
}

const carOptions = [
  { value: 1, label: '宾利', image: carAImage },
  { value: 2, label: '宝马', image: carBImage },
  { value: 3, label: '比亚迪', image: carCImage },
  { value: 4, label: '大众', image: carDImage },
];



const CarList: React.FC = () => {
  //addcar input 
  const [selectedCar, setSelectedCar] = useState('');
  //idle car list
  const [tokenList, setTokenList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  //own car list
  const [tokenList2, setTokenList2] = useState([]);
  const [modelList2, setModelList2] = useState([]);
  const [borrowList, setborrowList] = useState([]);
  //listen
  const [queryResult, setQueryResult] = useState({ owner: '', model: 0, user: '' });
  //query
  const [input, setInput] = useState('');//输入
  
  //account
  const [account, setAccount] = useState('')
  const [money,setMoney]=useState(0)

  const [labelinput,setlabelinput]=useState('')

  //初始化
  useEffect(() => {
    // 初始化检查用户是否已经连接钱包
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    const initCheckAccounts = async () => {
        // @ts-ignore
        const {ethereum} = window;
        if (Boolean(ethereum && ethereum.isMetaMask)) {
            // 尝试获取连接的用户账户
            const accounts = await web3.eth.getAccounts()
            if(accounts && accounts.length) {
                setAccount(accounts[0])
            }
            const m =await BorrowYourCarContract.methods.querybalance().call({
              from:account
            })
            setMoney(m);

        }
    }
    initCheckAccounts()
  }, [])

  useEffect(() => {
    getBorrowYourCarContractInfo()
  }, [])

  const getowncarList = async () => {
    if (BorrowYourCarContract) {
        try{
            // 调用智能合约函数
          const result = await BorrowYourCarContract.methods.ownercarlist().call({
            from: account
          });

          // 从结果中获取数组数据
          const finaltokenList = result[0].map(Number);
          const finalmodelList = result[1].map(Number);
          const finalownerList = result[2];

          // 保存数组数据到组件状态中
          setTokenList2(finaltokenList);
          setModelList2(finalmodelList);
          setborrowList(finalownerList);
        }catch (error: any) {
          alert(error.message)
        }
    } else {
        alert('Contract not exists.')
    }
  }

  const handleownList=async()=>{
    setlabelinput('租借人：');
    getowncarList();
  }

  const getborrowcarList = async () => {
    if (BorrowYourCarContract) {
        try{
            // 调用智能合约函数
          const result = await BorrowYourCarContract.methods.borrowlist().call({
            from:account
          });

          // 从结果中获取数组数据
          const finaltokenList = result[0].map(Number);
          const finalmodelList = result[1].map(Number);
          const finalownerList = result[2];

          // 保存数组数据到组件状态中
          setTokenList2(finaltokenList);
          setModelList2(finalmodelList);
          setborrowList(finalownerList);
        }catch (error: any) {
          alert(error.message)
        }
    } else {
        alert('Contract not exists.')
    }
  }

  const handleborrowList=async()=>{
    setlabelinput('车主：');
    getborrowcarList();
  }

  const getBorrowYourCarContractInfo = async () => {
    if (BorrowYourCarContract) {
        try{
            // 调用智能合约函数
          const result = await BorrowYourCarContract.methods.idlelist().call();

          // 从结果中获取数组数据
          const finaltokenList = result[0].map(Number);
          const finalmodelList = result[1].map(Number);
          const finalownerList = result[2];

          // 保存数组数据到组件状态中
          setTokenList(finaltokenList);
          setModelList(finalmodelList);
          setOwnerList(finalownerList);
        }catch (error: any) {
          alert(error.message)
        }
    } else {
        alert('Contract not exists.')
    }
  }

  const handleUpload = async () => {
    if(account === '') {
      alert('You have not connected wallet yet.')
      return
    }
    if (selectedCar) {
      if(BorrowYourCarContract){
        try{
          await BorrowYourCarContract.methods.addCar(selectedCar).send({
            from:account,
            gas: 500000
          })
          alert('You have add a car.')
        }catch (error: any) {
          alert(error.message)
        }
      }else {
        alert('Contract not exists.')
      }

      setSelectedCar('');
      getBorrowYourCarContractInfo();
    }
  };


  const handleCarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCar(event.target.value);
  };


  const onClickConnectWallet = async () => {
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    // @ts-ignore
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
        alert('MetaMask is not installed!');
        return
    }
    try {
        // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
        await ethereum.request({method: 'eth_requestAccounts'});
        // 获取小狐狸拿到的授权用户列表
        const accounts = await ethereum.request({method: 'eth_accounts'});
        // 如果用户存在，展示其account，否则显示错误信息
        setAccount(accounts[0] || 'Not able to get accounts');
    } catch (error: any) {
        alert(error.message)
    }
    const m =await BorrowYourCarContract.methods.querybalance().call({
      from:account
    })
    setMoney(m);
  }

  //borrowcar 
  const borrowcar = async (token:number) => {
    if(money/(10**18)<30)
      alert('Your CT must bigger than 30!')
    else{
      try {
        await BorrowYourCarContract.methods.setUser(token,account).send({
          from:account,
          gas: 500000
        })
        alert('You have borrow a car.')
        getBorrowYourCarContractInfo();
      }catch (error) {
        console.error(error);
      }
    }
  };

  const handleQuery = async() => {
    try {
      const inputNumber = parseInt(input, 10);
      await BorrowYourCarContract.methods.indexCar(inputNumber).send({
        from:account,
        gas: 500000
      })

      const re = await BorrowYourCarContract.methods.returnquery().call();
      if (re[2]==0x0000000000000000000000000000000000000000){
        setQueryResult({
          owner: re[0],
          model: parseInt(re[1]),
          user: '无',
        });
      }else{
        setQueryResult({
          owner: re[0],
          model: parseInt(re[1]),
          user: re[2],
        });
      }

    }catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="container">
      <img
        width='50%'
        height='120px'
        src={header}
      />
      <div className='user'>
        <h1>汽车租借服务</h1>
        
        <div className='account'>
          <button onClick={onClickConnectWallet}>连接钱包</button>
          <div>当前用户：{account === '' ? '无用户连接' : account}</div>
          <div>当前代币：{(money/ 10**18)}</div>
        </div>

      </div>

      <h2>导入新汽车</h2>
      <div className="form">
        <select value={selectedCar} onChange={handleCarChange} className="select-car">
          <option value="">选择车型</option>
          {carOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onClick={handleUpload} className="upload-button" disabled={!selectedCar }>
          导入
        </button>
      </div>

      <h2>查询汽车</h2>
      <input type="number" value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入车token" />
      <button onClick={handleQuery}>查询</button>
      <div>
      <p>车主: {queryResult.owner} ,车型: {carOptions.find((option) => option.value === queryResult.model)?.label}</p>
      <p>租借人: {queryResult.user}</p>
      </div>
      
      <h2>空闲汽车列表</h2>
      <ul className="car-list">
        {tokenList.map((token, index) => (
          <li key={index} className="car-list-item">
            <div className="car-info">
              <img src={carOptions.find((option) => option.value === modelList[index])?.image} alt={modelList[index]} className="car-image" />
              <div className="car-details">
                <span className="car-model">{carOptions.find((option) => option.value === modelList[index])?.label}</span>
                <span> 车主： </span>
                <span className="car-name">{ownerList[index]}</span>
              </div>
            </div>
            <button onClick={() => borrowcar(token)} className="borrow-button">租借</button>
          </li>
        ))}
      </ul>

      <h2>我的车辆列表</h2>
      <button onClick={handleownList}>拥有的车辆</button>
      <button onClick={handleborrowList}>租赁的车辆</button>
      <ul className="car-list">
        {tokenList2.map((token, index) => (
          <li key={index} className="car-list-item">
            <div className="car-info">
              <img src={carOptions.find((option) => option.value === modelList2[index])?.image} alt={modelList2[index]} className="car-image" />
              <div className="car-details">
                <span className="car-model">{carOptions.find((option) => option.value === modelList2[index])?.label}</span>
                <span> token： </span>
                <span className="car-name">{tokenList2[index]}</span>
                <span> {labelinput} </span>
                <span className="car-name">{borrowList[index]==0x0000000000000000000000000000000000000000?'无':borrowList[index]}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      

    </div>
  );
};

export default CarList;