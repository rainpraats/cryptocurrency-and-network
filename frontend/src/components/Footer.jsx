import { useEffect, useState } from 'react';
import './Footer.css';

const Footer = ({ walletInfo }) => {
  const [addressMsg, setAddressMsg] = useState('Address:');
  const [balanceMsg, setBalanceMsg] = useState('Balance:');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!walletInfo) {
      setAddressMsg('Could not determine address.');
      setBalanceMsg('Could not calculate balance.');
      return;
    }
    if (walletInfo.address) {
      const shortAddress = `${walletInfo.address.slice(
        0,
        4
      )}...${walletInfo.address.slice(-4)}`;
      setAddressMsg(`Address: ${shortAddress}`);
    } else {
      setAddressMsg('Could not determine address.');
    }

    if (walletInfo.balance) {
      setBalanceMsg(`Balance: ${walletInfo.balance}`);
    } else {
      setBalanceMsg('Could not calculate balance.');
    }
  }, [walletInfo]);

  const handleCopy = () => {
    if (!walletInfo.address) return;
    navigator.clipboard.writeText(walletInfo.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer>
      <p>{balanceMsg}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <span title={walletInfo.address}>{addressMsg}</span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!walletInfo.address}
          style={{ cursor: walletInfo.address ? 'pointer' : 'not-allowed' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
