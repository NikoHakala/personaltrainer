import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
//import moment from 'moment';

const TrainingsList = () => {
    //https://customerrest.herokuapp.com/api
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, [])

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(res => fetchTrainings())
            .then(res => setMessage('Training Deleted'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const saveTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTraining)
            }
        )
        .then(res => fetchTrainings())
        .then(res => setMessage('Training Added'))
        .then(res => setOpen(true))
        .catch(err => console.error(err))
    }

    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchTrainings())
        .then(res => setMessage('Training Updated'))
        .then(res => setOpen(true))
        .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Duration(m)",
            accessor: "duration"
        },
        {
            Header: "Activity",
            accessor: "activity"
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
            Cell: row => <EditTraining updateTraining={updateTraining} training={row.original}/>
        },
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            Cell: ({value}) => <Button color="secondary" size="small" onClick={() => deleteTraining(value)}>Delete</Button>
        },
    ]

    return (
        <div>
            <Grid container>
                <Grid item>
                    <AddTraining saveTraining={saveTraining}/>
                </Grid>
            </Grid>
            <ReactTable filterable={true} columns={columns} data={trainings}/>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message}/>
        </div>
    );
};

export default TrainingsList;