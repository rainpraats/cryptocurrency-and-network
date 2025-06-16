import { useEffect, useState } from 'react';
import ClientService from '../services/clientService';
import './Footer.css';

const Footer = () => {
  const [addressMsg, setAddressMsg] = useState('Balance:');
  const [balanceMsg, setBalanceMsg] = useState('Address:');
  const [fullAddress, setFullAddress] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      try {
        const walletInfo = await new ClientService().getWalletInfo();
        setBalanceMsg(`Balance: ${walletInfo.balance}`);
        setFullAddress(walletInfo.address);
        const shortAddress = `${walletInfo.address.slice(
          0,
          4
        )}...${walletInfo.address.slice(-4)}`;
        setAddressMsg(`Address: ${shortAddress}`);
      } catch (error) {
        setBalanceMsg('Could not calculate balance.');
        setAddressMsg('Could not determine address.');
        setFullAddress('');
        console.error(error);
      }
    };

    fetchWalletInfo();
  }, []);

  const handleCopy = () => {
    if (!fullAddress) return;
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer>
      <p>{balanceMsg}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <span title={fullAddress}>{addressMsg}</span>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!fullAddress}
          style={{ cursor: fullAddress ? 'pointer' : 'not-allowed' }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
