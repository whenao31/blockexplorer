import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useMemo, useState } from 'react';

import './App.css';
import BlockData from './components/BlockData';
import { SearchBlockBar } from './components/SearchBlockBar';
import TransactionsTable from './components/TransactionsTable';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockWithTxs, setBlockWithTxs] = useState({});

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();

  }, [blockNumber]);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold">Last Block Number: {blockNumber}</h1>
      <div>
        <SearchBlockBar 
          blockNo={blockNumber} 
          alchemy={alchemy} 
          blockWithTxs={blockWithTxs} 
          setBlockWithTxs={setBlockWithTxs}
        />
        <br />
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          {
            blockWithTxs.number !== undefined && 
            <BlockData blockWithTxs={blockWithTxs}/>
          }
          {
            blockWithTxs.number !== undefined &&
            <TransactionsTable blockWithTxs={blockWithTxs}/>
          }
        </div>
      </div>
    </div>
  );  
}

export default App;
