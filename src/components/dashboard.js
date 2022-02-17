
import React, { useState, useEffect } from "react";
import Iframe from './drivers-states.js';
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const cookies = new Cookies();
    const [roleId, setRole] = useState();
    const [token, setToken] = useState();
    const [email, setEmail] = useState();
    const [roleList, setRoleList] = useState([]);
    useEffect(() => {
        console.log(props.role);
        setRole(cookies.get("role"))
        fetch(
            'http://localhost:5000/GetRole',
            {
                method: 'GET'
            }
        )
            .then((response) => response.json())
            .then((response) => {
                const newList = roleList.concat(response.result);
                console.log(newList.filter(name => name.Id=== props.role));
                // setRoleList(
                //     newList.filter(name => name.Id === props.role)
                // );
               
                console.log(roleList);

            });
    }, []);
    const handleLogout = () => {
       
        setToken(cookies.get('auth'));
        setEmail(cookies.get('email'));

        if (token !== '' && email !== '') {
            cookies.remove("auth");
            cookies.remove("email");
            fetch(
                'http://localhost:5000/logout',
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
           { roleId == 1 ?
            <Link to="/create-action">create action</Link>
            :
            <></>
           }
            <Link to="/view-actions" state={{ role: roleId }}>view action</Link>
        </div>
    );
};



export default Dashboard;