// App.js

import React, { useState, useEffect } from 'react';
import {  ethers } from 'ethers';
import './App.css'; // Import the custom CSS file
import avatar from './avatar.png';
import poolABI from './abi/pool.json'
import tokenABI from './abi/token.json'
import { BigNumber } from 'ethers';
const tokenAddress="0x5741E7ADc4657599f7F831e425c6C685D8dB3fB4"
const poolAddress="0x786ed31Aa96164822C5f045F8aD5e73C4c3f49fa"

const App = () => {
  const [networks, ] = useState(['Ethereum', 'Polygon', 'BSC','AMOY']);
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [selectedCoin, setSelectedCoin] = useState('EDX');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, ] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [coin , setCoin] = useState('');
  const[showApprove, setShowApprove] = useState(false);
  const[showCross, setShowCross] = useState(false);
  const[tokenBalance, setTokenBalance] = useState('');
 

  const networkParams_ethereum = {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://ethereum-rpc.publicnode.com'],
    blockExplorerUrls: ['https://etherscan.io'],
  }

  const networkParams_AMOY = {
    chainId: '0x13882',
    chainName: 'Polygon Amoy',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-amoy.polygon.technology'],
    // blockExplorerUrls: ['https://etherscan.io'],
  }


  const networkParams_BSC = {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.bnbchain.org'],
    blockExplorerUrls: ['https://etherscan.io'],
  }

  // const networkParams_edexaMainnet = {
  //   chainId: '0x1530',
  //   chainName: 'Edexa Mainnet',
  //   nativeCurrency: {
  //     name: 'EDEXA',
  //     symbol: 'EDX',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://mainnet.edexa.network/rpc'],
  //   blockExplorerUrls: ['https://explorer.edexa.network'],
  // };

  // const networkParams_edexaTestnet = {
  //   chainId: '0x7cb',
  //   chainName: 'Edexa Testnet',
  //   nativeCurrency: {
  //     name: 'EDEXA',
  //     symbol: 'EDX',
  //     decimals: 18,
  //   },
  //   rpcUrls: ['https://testnet.edexa.network/rpc'],
  //   blockExplorerUrls: ['https://explorer.testnet.edexa.network'],
  // };


  const networkParams_polygon = {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.edexa.network/rpc'],
    blockExplorerUrls: ['https://explorer.edexa.network'],
  };
  const connectWallet = async () => {
    try {
     const accounts= await window.ethereum.request({ method: 'eth_requestAccounts' });
     setWalletAddress(accounts[0]);
     setIsConnected(true);
     
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };


 async function CheckNetwork(x) {
  
  const prov = new ethers.providers.Web3Provider(window.ethereum);
  const signer = prov.getSigner();
  console.log(signer);
  const network = await prov.getNetwork();
  const networkId = network.chainId;
  console.log (networkId);

  if(x==='Ethereum' && networkId !==1)   {
 
    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      });
      console.log('Network switched successfully');
    
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          // Try to add the network
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams_ethereum],
          });
          console.log('Network added successfully');
         
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      } else {
        console.error('Failed to switch network:', switchError);
      }
    }
  } 

  if(x==='Polygon' && networkId !== 137)   {
 
    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      });
      console.log('Network switched successfully');
    
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          // Try to add the network
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams_polygon],
          });
          console.log('Network added successfully');
         
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      } else {
        console.error('Failed to switch network:', switchError);
      }
    }
  } 


  if(x==='AMOY' && networkId !== 80002)   {
 
    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13882' }],
      });
      console.log('Network switched successfully');
    
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          // Try to add the network
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams_AMOY],
          });
          console.log('Network added successfully');
         
        } catch (addError) {    
          console.error('Failed to add network:', addError);
        }}}}



        if(x==='BSC' && networkId !== 56)   {
 
          try {
            // Try to switch to the network
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x38' }],
            });
            console.log('Network switched successfully');
          
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                // Try to add the network
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [networkParams_BSC],
                });
                console.log('Network added successfully');
               
              } catch (addError) {    
                console.error('Failed to add network:', addError);
              }}}
            }

            }


 const approve=async()=>{
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
     const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    const tx = await tokenContract.approve(poolAddress, ethers.utils.parseEther(amount));
    await tx.wait();
  }catch(error){
    console.log(error);
  }

}


const CROSS2=async()=>{
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const poolContract = new ethers.Contract(poolAddress, poolABI, signer);
    const fee= await poolContract.estimateFee(1073741850,8000000);
    const feeInWei = ethers.utils.parseUnits(fee.toString(), 'wei');
    const tx = await poolContract.crossTo(1073741850,recipient,ethers.utils.parseEther(amount),{value:BigNumber.from(feeInWei)});
    await tx.wait();
  }catch(error){
    console.log(error);
  }

}

const fetch = async () => {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if(signer){
     const bal = await signer.getBalance()
    setBalance(ethers.utils.formatEther(bal));
    }
    const network = await provider.getNetwork();
    const networkId = network.chainId;
    const accounts = await provider.listAccounts();
    if (networkId === 1995) {
      setNetwork('EDX testnet');
      setCoin('EDX');
    } else if (networkId === 5424) {
      setNetwork('EDX MAINNET');
      setCoin('EDX');
    } else if (networkId === 1) {
      setNetwork('Ethereum');
      setCoin('ETH');
    } else if (networkId === 137) {
      setNetwork('Polygon');
      setCoin('MATIC');
    } else if (networkId === 56) {
      setNetwork('BSC');
      setCoin('BNB');
    } else if (networkId === 80002) {
      setNetwork('AMOY');
      setCoin('AMOY');

    } else {
      setNetwork('unknown network');
      setCoin('NA');
     
    }
    

     setWalletAddress(accounts[0]);
     setIsConnected(true);

    

  }









  useEffect(() => {
   fetch() 
   
  },[]);

  const handleAccountsChanged = (accounts) => {
    fetch();
    if (accounts.length === 0) {
      setWalletAddress(null);
      setIsConnected(false);
    } else {
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    }
  };

  window.ethereum.on('accountsChanged', handleAccountsChanged);
  window.ethereum.on('chainChanged', fetch);

useEffect(() => {
  const getAllownace=async()=>{
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const user= await signer.getAddress()
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const tx = await tokenContract.allowance(user,poolAddress);
      const ALLOWANCE = (ethers.utils.formatEther(tx));
      if(ALLOWANCE>=amount){setShowApprove(false);
      setShowCross(true)} else if(ALLOWANCE<amount){setShowApprove(true);setShowCross(false)}
      if(showApprove===true){setShowCross(false)}
    
    }catch(error){
      console.log(error);
    }
  }
 
 getAllownace()
},[recipient])

const setMax=async()=>{
  try{
   
    setAmount('50000');
    
  }catch(error){
    console.log(error);
  }
}


const getCoinBalance=async()=>{
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const user= await signer.getAddress()
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    const bal = await tokenContract.balanceOf(user);
    console.log(bal);
    setTokenBalance(ethers.utils.formatEther(bal));
  }catch(error){
    console.log(error);
  }
}

getCoinBalance();

return (
  <div className="blockchain-bridge">
    <div className="connect-section">
      {isConnected && network&&walletAddress && <button className="network">{network}</button>}
      <div className="board"></div>
      {isConnected && balance&& (
        <button className="balance">{balance.slice(0, 6)} {coin}</button>
      )}
      {isConnected&& walletAddress ? (
        <button className="button2" disabled={true}>
          <img className="avatar" src={avatar} alt="Avatar" />
          {isConnected && (
            <p className="name">
              {walletAddress.slice(0, 6)}..{walletAddress.slice(-4)}
            </p>
          )}
        </button>
      ) : (
        <button className="button1" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>








    

    <div className="bridge-form">
      <h1>Blockchain Bridge</h1>
      <br />
      
      <div >
        <div>
        <select id='x'
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          onClick={(e) => CheckNetwork(e.target.value)}
          
        >
          {networks.map((network) => (
            <option key={network} value={network}>
              {network}
            </option>
          ))}
        </select>
        <select id='coin'
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          
        >
          <option value="ETT">ETT</option>
          
          {/*  options for DAI, USDC, etc. here */}
        </select>

        </div>
      </div>
      


      <h3>TO</h3>
      


      <div>
        <select id='x'
        value="EDEXA"
          onChange={(e) => setSelectedNetwork(e.target.value)}
          onClick={(e) => CheckNetwork(e.target.value)}
        >
          
            <option key={"EDEXA"} value="EDEXA" disabled='true'>
             edeXa Testnet
            </option>
      
        </select>
        <select id='coin'
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          
        >
          <option value="EDX">EDX</option>
          
          {/*  options for DAI, USDC, etc. here */}
        </select>
      </div>


     <br></br><br></br><br></br><br></br>



      <form>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <p>Balance: {tokenBalance}</p>
        <button onClick={setMax}>Max</button>
        <br />  <br />
        <label>Recipient Address:</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <br />
      </form>

     {showApprove&&(<button id="button2" onClick={approve}>approve</button>)} 
     {showCross&&(<button id="button2" onClick={CROSS2}>TRANSFER</button>)}
      {status && <p className="status">{status}</p>}
      <br></br><br></br><br></br><br></br>

    </div>
  </div>
);

};

export default App;
