import React, { useState } from 'react';

const LatestBlocks = () => {
  const [blocks, setBlocks] = useState();
  return (
    <>
      <h2>Latest Blocks</h2>
      <button>Mine Block</button>
      <ul>
        {blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </ul>
    </>
  );
};

export default LatestBlocks;
