import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import ConnectXero from './components/ConnectXero';
import AccountsTable from './components/AccountsTable';
import VendorsTable from './components/VendorsTable';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authStatus = queryParams.get('authStatus');
    if (authStatus === 'success') {
      setConnected(true); // Set connected to true if OAuth is successful
      navigate('/'); // Navigate to the root to show the tables
    }
  }, [navigate]);

  const handleConnectionSuccess = () => {
    // Update the state to show tables once connected
    setConnected(true);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !connected ? (
              <ConnectXero onConnectionSuccess={handleConnectionSuccess} />
            ) : (
              <div className="table-wrapper">
                <AccountsTable />
                <VendorsTable />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
