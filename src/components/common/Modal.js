import React from 'react';
import { Button } from 'primereact/button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function Modal(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth={true}
            maxWidth={"sm"}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.detalle}</DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="alert-dialog-description">{props.mensaje}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} label="Aceptar" className="p-button"></Button>
            </DialogActions>
        </Dialog>
    );
}