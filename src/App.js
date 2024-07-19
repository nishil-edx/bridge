import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const App = () => {
  const [networks, setNetworks] = useState(['Ethereum', 'Polygon', 'BSC']);
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [selectedCoin, setSelectedCoin] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    // Fetch the list of available networks
    // Example: using ethers.js for Ethereum
    const provider = new ethers.providers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
    provider.getNetwork().then((network) => {
      setNetworks([network.name]);
      setSelectedNetwork(network.name);
    });
  }, []);

  useEffect(() => {
    if (selectedNetwork && selectedCoin) {
      // Fetch the balance of the selected coin on the selected network
      // Example: using ethers.js for Ethereum
      const provider = new ethers.providers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
      const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with the contract address of the selected coin
      const contract = new ethers.Contract(contractAddress, [
        'function balanceOf(address owner) public view returns (uint256)',
      ], provider);
      contract.balanceOf(recipient).then((balance) => {
        setBalance(ethers.utils.formatEther(balance));
      });
    }
  }, [selectedNetwork, selectedCoin, recipient]);

  const handleTransfer = async () => {
    try {
      // Perform transfer logic based on selected network
      // Example: using ethers.js for Ethereum
      const provider = new ethers.providers.JsonRpcProvider('https://ethereum-rpc.publicnode.com');
      const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
      const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Replace with the contract address of the selected coin
      const contract = new ethers.Contract(contractAddress, [
        'function transfer(address to, uint256 amount) public returns (bool)',
      ], wallet);
      const tx = await contract.transfer(recipient, ethers.utils.parseEther(amount));
      setStatus(`Token transfer sent: ${tx.hash}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="blockchain-bridge">
      <h1>Blockchain Bridge</h1>
      <div>
        <label>Select Network:</label>
        <select value={selectedNetwork} onChange={(e) => setSelectedNetwork(e.target.value)}>
          {networks.map((network) => (
            <option key={network} value={network} disabled={network !== 'Ethereum' && network !== 'Polygon' && network !== 'BSC'}>
              {network}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Coin:</label>
        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} disabled>
          <option value="ETH">ETH</option>
          {/* Add options for DAI, USDC, etc. here */}
        </select>
      </div>
      <div>
        <label>Balance:</label>
        <p>{balance}</p>
      </div>
      <form onSubmit={handleTransfer}>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <label>Recipient Address:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        <br />
        <button type="submit">Transfer</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
export default App;