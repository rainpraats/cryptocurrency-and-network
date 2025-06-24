import { useState, useEffect } from 'react';
import CreateTransaction from '../components/CreateTransaction';
import LatestBlocks from '../components/LatestBlocks';
import ClientService from '../services/clientService';
import LatestTransactions from '../components/LatestTransactions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [usersBlocks, setUsersBlocks] = useState();
  const [walletInfo, setWalletInfo] = useState({});

  useEffect(() => {
    const fetchUsersBlocks = async () => {
      try {
        const blocks = await new ClientService().getUsersBlocks();
        setUsersBlocks(blocks);
      } catch (error) {
        console.error('Failed to fetch users blocks:', error);
      }
    };

    fetchUsersBlocks();
  }, []);

  const fetchWalletInfo = async () => {
    try {
      const wallet = await new ClientService().getWalletInfo();
      if (wallet) {
        setWalletInfo(wallet);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWalletInfo();
  }, []);

  return (
    <>
      <Header />
      <main>
        <CreateTransaction />
        <LatestBlocks
          usersBlocks={usersBlocks}
          setUsersBlocks={setUsersBlocks}
          fetchWalletInfo={fetchWalletInfo}
        />
        <LatestTransactions
          usersBlocks={usersBlocks}
          usersAddress={walletInfo.address}
        />
      </main>
      <Footer walletInfo={walletInfo} />
    </>
  );
};

export default Home;
