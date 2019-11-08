import React, { useState, useEffect }  from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
//import moment from 'moment';

const TrainingsList = () => {
    //https://customerrest.herokuapp.com/api
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, [])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then((response) => response.json())
        .then(data => setTrainings(data.content))
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
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} columns={columns} data={trainings}/>
        </div>
    );
};

export default TrainingsList;