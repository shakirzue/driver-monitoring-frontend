import React, { useState } from "react";
import Cookies from 'universal-cookie';

const ActionNote = (props) => {
    const [action_id, setActionId] = useState();
    const [note, setNote] = useState();

    const handleChange = (event) => {      
        setActionId(props.actionid);
        setNote(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'action_id': action_id, 'note': note, email: cookies.get('email'), token: cookies.get('auth') })
        };
        fetch('http://localhost:5000/CreateActionNotes', requestOptions)
        .then(function (response) {
            response.json();
        }).then((result)=>{
            console.log(result);
            window.location.href = "/view-actions";
        });
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="action_id" value='0'></input>
            <input type="text" name="note" onChange={handleChange}></input>
            <input type="submit" value="Submit" />
        </form>
    );
};

export default ActionNote;