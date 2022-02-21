import React, { useState } from "react";
import Cookies from 'universal-cookie';
import '../css/main.css';
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
        fetch(process.env.REACT_APP_SERVER_API_URL + 'CreateActionNotes', requestOptions)
            .then(function (response) {
                response.json();
            }).then((result) => {
                console.log(result);
                window.location.href = "/view-actions";
            });
        event.preventDefault();
    };

    return (
        <div className="form-box">
            <h5 className="form-step"> Create action to assesst driver activities</h5>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="action_id" value='0'></input>
                <input type="text" name="note" onChange={handleChange}></input>
                <input type="submit" value="Submit" className="submitBtn"/>
            </form>
        </div>
    );
};

export default ActionNote;