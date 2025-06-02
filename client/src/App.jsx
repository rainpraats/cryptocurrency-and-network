import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './Router';
import { BlockchainContext } from './context/blockchainContext';

function App() {
  return (
    <>
      <BlockchainContext.Provider value={blockchain}>
        <RouterProvider router={router}></RouterProvider>
      </BlockchainContext.Provider>
    </>
  );
}

export default App;
