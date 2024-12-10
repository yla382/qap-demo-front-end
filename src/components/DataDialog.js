import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DialogTemplate from './DialogTemplate'; 

const DataDialog = ({ open, onClose, data, type }) => {
    const template = DialogTemplate[type] || [];

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Account Details</DialogTitle>
            <DialogContent>
                {template.map(({ key, label, format }) => {
                    const value = data[key];
                    return (
                        <p key={key}>
                            <strong>{label}:</strong> {format ? format(value) : value || "N/A"}
                        </p>
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DataDialog;