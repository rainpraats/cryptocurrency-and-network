import React from 'react';
import CreateTransaction from '../components/CreateTransaction';
import LatestBlocks from '../components/LatestBlocks';

const Home = () => {
  return (
    <>
      <CreateTransaction />
      <LatestBlocks />
    </>
  );
};

export default Home;
