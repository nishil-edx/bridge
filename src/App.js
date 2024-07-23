// App.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css'; // Import the custom CSS file
import avatar from './avatar.png';
import {poolABI} from './abi/pool.json'

const App = () => {
  const [networks, setNetworks] = useState(['Ethereum', 'Polygon', 'BSC','AMOY']);
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [selectedCoin, setSelectedCoin] = useState('EDX');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [ensName, setENSName] = useState('');
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [search, setSearch] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const[coin , setCoin] = useState('');
 
 
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

  const networkParams_edexaMainnet = {
    chainId: '0x1530',
    chainName: 'Edexa Mainnet',
    nativeCurrency: {
      name: 'EDEXA',
      symbol: 'EDX',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.edexa.network/rpc'],
    blockExplorerUrls: ['https://explorer.edexa.network'],
  };

  const networkParams_edexaTestnet = {
    chainId: '0x7cb',
    chainName: 'Edexa Testnet',
    nativeCurrency: {
      name: 'EDEXA',
      symbol: 'EDX',
      decimals: 18,
    },
    rpcUrls: ['https://testnet.edexa.network/rpc'],
    blockExplorerUrls: ['https://explorer.testnet.edexa.network'],
  };


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
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };


async function CheckNetwork(x) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  console.log (networkId);

  if(x=='Ethereum' && networkId != 1)   {
 
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

  if(x=='Polygon' && networkId != 137)   {
 
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


  if(x=='AMOY' && networkId != 80002)   {
 
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
            params: [networkParams_BSC],
          });
          console.log('Network added successfully');
         
        } catch (addError) {    
          console.error('Failed to add network:', addError);
        }}}}



        if(x=='BSC' && networkId != 56)   {
 
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
              }}}}
      




}


 


  useEffect(() => {
    const fetch = async () => {
      try {
        if (!window.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bal = await signer.getBalance();
        setBalance(ethers.utils.formatEther(bal));
        const network = await provider.getNetwork();
        const networkId = network.chainId;
        const accounts = await provider.listAccounts();
        if (!accounts[0]) return;
        setNetworkId(networkId);

        if (networkId == 1995) {
          setNetwork('EDX testnet');
          setCoin('EDX');
        } else if (networkId == 5424) {
          setNetwork('EDX MAINNET');
          setCoin('EDX');
        } else if (networkId == 1) {
          setNetwork('Ethereum');
          setCoin('ETH');
        } else if (networkId == 137) {
          setNetwork('Polygon');
          setCoin('MATIC');
        } else if (networkId == 56) {
          setNetwork('BSC');
          setCoin('BNB');

        } else {
          setNetwork('unknown network');
          setCoin('NA');
         
        }

        setWalletAddress(accounts[0]);
        setIsConnected(true);

        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {}
    };
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

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    fetch();
  }, [walletAddress,networkId,window.ethereum.chainId]);

  const handleTransfer = async () => {};

  return (
    <div className="blockchain-bridge">
      <div className="connect-section">
        {isConnected && network && <button className="network">{network}</button>}
        <div className="board">
         
        </div>
        {isConnected && balance && (
          <button className="balance">{balance.slice(0, 6)} {coin}</button>
        )}
         {isConnected ? (
            <button className="button2" disabled={true}>
              <img className="avatar" src={avatar} alt="Avatar" />
              {isConnected && ensName ? (
                <p className="name">{ensName}</p>
              ) : (
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
        <div>
          <label>Select Network:</label>
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            onClick={(e) => CheckNetwork(e.target.value)}
          >
            {networks.map((network) => (
              <option
                key={network}
                value={network}
               
                // disabled={
                //   network !== 'Ethereum' &&
                //   network !== 'Polygon' &&
                //   network !== 'BSC'
                // }
               
              >
                {network}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Coin:</label>
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
            disabled
          >
            <option value="EDX">EDX</option>
            {/* Add options for DAI, USDC, etc. here */}
          </select>
        </div>
        <div>
          {/* <label>Balance:</label>
          <p>{balance}</p> */}
        </div>
        <form onSubmit={handleTransfer}>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <br />
          <button type="submit">Transfer</button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
};

export default App;
