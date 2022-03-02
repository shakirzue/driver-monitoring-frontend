import React, { useState, useEffect } from 'react';

function ShowCallLogs() {


    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch(
            process.env.REACT_APP_SERVER_API_URL + 'GetCallLocationLogs',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ SearchDate: '9/1/2021' }),
            }
        )
            // .then((response) => { response.json(); })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);

                setLogs(response.result);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },[]);
    return (
        <div>
            <table className='center'>
                <thead>
                    <tr>
                       

                        <th>Sales Order</th>
                        <th>Date</th>
                        <th>Number of call made to customer</th>


                        <th>Customer number found in call logs</th>
                        <th>Skip stop and Customer location distance</th>
                        <th>Difference between skip stop and call times</th>

                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log.Id}>
                            <td >{log.SalesOrderNumber}</td>
                            <td >{log.Date}</td>
                            <td >{log.NumberOfCallMade}</td>
                            <td >
                                {log.DifferenceInCoordinates}
                            </td>
                            <td >
                                {log.DifferenceInLastCallAndSkipTimes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}


export default ShowCallLogs;