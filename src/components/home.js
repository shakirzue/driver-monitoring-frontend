import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { Link } from "react-router-dom";
import Dashboard from './dashboard';
const Home = () => {
    const cookies = new Cookies();
    const [connectionText, setText] = useState("");
    const [isLoggedIn, setLoginState] = useState("");
    const [token, setToken] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState();

    useEffect(() => {

        if (typeof cookies.get('auth') !== 'undefined' &&
            typeof cookies.get('email') !== 'undefined'&&
            typeof cookies.get('role') !== 'undefined') {
            setLoginState(true);
            setEmail(cookies.get('email'));
            setRole(cookies.get('role'));
        }
        fetch(
            process.env.REACT_APP_SERVER_API_URL)
            .then((res) => res.text())
            .then((text) => {
                setText(text);
            });
    });

    return (
        <div className="App" >
            <h1>{connectionText == "" ? "Please login" : connectionText}</h1>
            <br />
            <ul>
                {
                    isLoggedIn == true ?
                        <>
                          <Dashboard email={email} role={role}  />
                        </>
                        :
                        <Link to="/Login">Login</Link>
                }
            </ul>
        </div>
    );
};

export default Home;