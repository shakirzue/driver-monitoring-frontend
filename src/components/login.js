import React from "react";
import Cookies from 'universal-cookie';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connectionText: ""
        };
    }

    componentDidMount() {
        fetch(
            process.env.REACT_APP_SERVER_API_URL)
            .then((res) => res.text())
            .then((text) => {
                this.setState({
                    connectionText: text
                });
            })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'email': document.getElementById('email').value, 'password': document.getElementById('password').value }),
        };
        fetch(
            process.env.REACT_APP_SERVER_API_URL + "login",
            requestOptions
        )
            .then((response) => response.json())
            .then((response) => {
                console.log('Success:', response);
                if (response.success == true) {
                    const cookies = new Cookies();
                    cookies.set('auth', response.auth, { path: '/' });
                    cookies.set('email', response.email, { path: '/' });
                    cookies.set('role', response.role, { path: '/' });
                    alert(response.message);
                    window.location.href = "/";
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                alert('Error occur while accessing records');
            });
    }

    render() {
        const { connectionText } = this.state;
        return (
            <div className="App">
                <h1>{connectionText}</h1>
                <form method="POST" onSubmit={this.onSubmitHandler} className="form">
                    <input type='text' name='email' id='email'></input>
                    <input type='text' name='password' id='password'></input>
                    <input type="submit" />
                </form>
            </div>
        );
    }
}

export default Login;
