import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { useLocation } from 'react-router-dom'
import ActionNote from './action-note.js';

function ViewActionNotes() {
    // constructor(props) {
    // super(props);
    const location = useLocation();
    const cookies = new Cookies();
    const [actionNotesList, setActionNotesList] = useState([]);
    const [action_id, setActionId] = useState(location.state.actionid);
    const [token, setToken] = useState(cookies.get('auth'));
    const [email, setEmail] = useState(cookies.get('email'));
    const [roleid, setRole] = useState(cookies.get('role'));
    

    // componentDidMount() {
    useEffect(() => {       
        
        setActionId(location.state.actionid);
        var isuserassignee = false;
        if (roleid === '1') {
            isuserassignee = false;
        }
        else {
            isuserassignee = true;
        }
        
        console.log(JSON.stringify({ action_id: action_id, email: email, token: token, isassignee: isuserassignee }));
        fetch(
            process.env.REACT_APP_SERVER_API_URL + "GetActionNoteByEmail", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action_id: action_id, email: email, token: token, isassignee: isuserassignee })
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.actions)
                setActionNotesList(response.actions);
                // this.setState({
                //     actionNotesList: response.actions
                // });
            });
    },[]);

    // render() {
    return (
        <div>
            {
                <div style={{ border: "1px solid" }}>
                    {
                        actionNotesList.map(note => (
                            <p >{note.comment}</p>
                        ))
                    }
                </div>
            }
        </div>
    )
    // }
}
export default ViewActionNotes;
