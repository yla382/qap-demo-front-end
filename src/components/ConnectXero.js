import React, { useState } from 'react';

const ConnectXero = () => {
  const [status, setStatus] = useState('');

  const handleConnect = () => {
    setStatus('Redirecting to Xero...');
    window.location.href = 'http://localhost:8000/xero/authenticate'; // Trigger backend OAuth
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Connect to Xero</h2>
      <button onClick={handleConnect} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Connect to Xero
      </button>
      <p>{status}</p>
    </div>
  );
};

export default ConnectXero;
