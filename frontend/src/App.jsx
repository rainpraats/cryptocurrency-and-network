import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './Router';
import { BlockchainContext } from './context/blockchainContext';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [blockchain, setBlockchain] = useState();

  useEffect(() => {
    if (blockchain) return;

    const fetchBlockchain = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blocks/');
        if (!response.ok)
          throw new Error(
            'Network response was not ok. Is the server running?'
          );
        const { data } = await response.json();
        setBlockchain(data.chain);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchBlockchain();
  }, [blockchain]);

  useEffect(() => {
    if (!blockchain) return;
    console.log(blockchain);
  }, [blockchain]);

  return (
    <>
      <BlockchainContext.Provider value={blockchain}>
        <RouterProvider router={router}></RouterProvider>
      </BlockchainContext.Provider>
    </>
  );
}

export default App;
