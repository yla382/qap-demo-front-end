import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DataDialog from './DataDialog';
import '../App.css';

const AccountsTable = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null);

    useEffect(() => {
        // Fetch data from the PHP API
        fetch('http://localhost:8000/accounts')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setAccounts(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);

    const handleRowClick = (params) => {
      setSelectedAccount(params.row);
      setDialogType("account");
      setOpenDialog(true); 
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
    
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    const columns = [
      { field: 'Code', headerName: 'Account Code', flex: 1 },
      { field: 'Name', headerName: 'Account Name', flex: 2 },
      { field: 'Type', headerName: 'Account Type', flex: 1 },
      { field: 'Status', headerName: 'Status', flex: 1 },
    ];

      return (
        <div className="table-container">
          <h1>Accounts</h1>
          <DataGrid
                rows={accounts}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                getRowId={(row) => row.AccountID}
                onRowClick={handleRowClick}
          />
          <DataDialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                data={selectedAccount}
                type={dialogType}
          />
        </div>
      );
}

export default AccountsTable;