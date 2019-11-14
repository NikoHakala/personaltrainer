import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditTraining(props){

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState(
        {date:'', duration:0, activity:''}
    );

    const handleClickOpen = () => {
        console.log(props.training)
        setTraining({date: props.training.date, duration: props.training.duration, 
            activity: props.training.activity, customerid: props.training.customerid})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    };

    const updateTraining = () => {
        props.updateTraining(training, props.training.links[0].href);
        handleClose();
    }

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Training</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Edit training details
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
                    label="Duration (m)"
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
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={updateTraining} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}