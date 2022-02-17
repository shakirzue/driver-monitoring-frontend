import React,  { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

const ViewTotalActionCount = (props) => {
    const [roleId, setRole] = useState();
    const [token, setToken] = useState();
    const [email, setEmail] = useState();
    useEffect(() => {    
        const cookies = new Cookies();
        setToken(cookies.get('auth'));
        setEmail(cookies.get('email'));
        setRole(cookies.get("role"))

        var isuserassignee = false;
        if (roleId === '1') {
            isuserassignee = false;
        }
        else {
            isuserassignee = true;
        }
       
        fetch(
            'http://localhost:5000/GetActionCountByStatus',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, token: token, isassignee: isuserassignee })
            }
        )
            .then((response) => response.json())
            .then((response) => {

                console.log(response.result);
            });

       
    }, []);

    return (
        <div>
            <h1></h1>
            <h1></h1>
        </div>
    );
};

export default ViewTotalActionCount;