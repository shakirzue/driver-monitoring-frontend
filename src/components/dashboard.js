
import React, { useState, useEffect } from "react";
import Iframe from './drivers-states.js';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import ViewTotalActionCount from "./Total-action-count";

const Dashboard = (props) => {
    const cookies = new Cookies();
    const [roleId, setRole] = useState();
    const [token, setToken] = useState();
    const [email, setEmail] = useState();
    const [roleList, setRoleList] = useState([]);
    useEffect(() => {
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
            process.env.REACT_APP_SERVER_API_URL+'GetRole',
            {
                method: 'GET'
            }
        )
            .then((response) => response.json())
            .then((response) => {
                const newList = roleList.concat(response.result);
            });
    }, []);
    const handleLogout = () => {

        setToken(cookies.get('auth'));
        setEmail(cookies.get('email'));

        if (token !== '' && email !== '') {
            cookies.remove("auth");
            cookies.remove("email");
            fetch(
                process.env.REACT_APP_SERVER_API_URL+'logout',
                {
                    method: 'GET'
                }
            )
                .then((res) => res.text())
                .then((response) => {
                    console.log('Success:', response);
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="App" >
            <div onClick={handleLogout}>Logout</div>
            {
                roleId == 1 ?
                    <Iframe />
                    : <></>
            }
            {roleId == 1 ?
                <Link to="/create-action">create action</Link>
                :
                <></>
            }
            <Link to="/view-actions" state={{ role: roleId }}>view action</Link>
            <ViewTotalActionCount />
        </div>
    );
};



export default Dashboard;