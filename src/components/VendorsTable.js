import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import DataDialog from './DataDialog';
import '../App.css';


const VendorsTable = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(null);

    useEffect(() => {
        // Fetch data from the PHP API
        fetch('http://localhost:8000/vendors')
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            const flattenedData = data.map((vendor) => ({
                ...vendor,
                accountsPayableOutstanding: vendor.Balances?.AccountsPayable.Outstanding ?? 0,
                accountsPayableOverdue: vendor.Balances?.AccountsPayable.Overdue ?? 0
            }));
            setVendors(flattenedData);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);

      const handleRowClick = (params) => {
        setSelectedVendor(params.row);
        setDialogType("vendor");
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
        { field: 'Name', headerName: 'Vendor Name', flex: 2 },
        { field: 'DefaultCurrency', headerName: 'Currency', flex: 1 },
        { field: 'ContactStatus', headerName: 'Status', flex: 1 },
        { field: 'accountsPayableOutstanding', headerName: 'Payable', flex: 1 },
    ];

      return (
        <div className="table-container">
          <h1>Vendors</h1>
          <DataGrid
              rows={vendors}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.ContactID}
              onRowClick={handleRowClick}
            />
          <DataDialog 
              open={openDialog} 
              onClose={handleCloseDialog} 
              data={selectedVendor}
              type={dialogType}
          />
        </div>
      );
}

export default VendorsTable;