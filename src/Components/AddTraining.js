import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState(
        {date:'', duration:0, activity:'', customerid:''}
        );

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    };

    const addTraining = () => {
        console.log(training);
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div style={{margin: 10}}>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add Training
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Training</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Insert training details
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleChange(e)}
                        label="Date (YYYY-MM-DD)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleChange(e)}
                        label="Duration(in minutes)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="customerid"
                        value={training.customerid}
                        onChange={e => handleChange(e)}
                        label="CustomerID"
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
    )
}
