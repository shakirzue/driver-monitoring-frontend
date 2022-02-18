import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import '../css/main.css';

class ViewTotalActionCount extends React.Component {

    constructor(props) {
        const cookies = new Cookies();
        super(props);
        this.state = {
            roleId: cookies.get('role'),
            token: cookies.get('auth'),
            email: cookies.get('email'),
            countList: []
        }        
    }
    componentDidMount() {
        var isuserassignee = false;
        if (this.state.roleId === '1') {
            isuserassignee = false;
        }
        else {
            isuserassignee = true;
        }

        console.log(JSON.stringify({ email: this.state.email, token: this.state.token, isassignee: isuserassignee }));
        fetch(
            process.env.REACT_APP_SERVER_API_URL+'GetActionCountByStatus',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.state.email, token: this.state.token, isassignee: isuserassignee })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                this.setState({ countList: response.result })
                console.log(response.result);
            });


    };
    render() {
        return (
            <div>
                 <h1>Action status</h1>
                {this.state.countList.map(count => (
                    <table className="center">
                        <thead>
                            <tr><td> Total number of {count.status} actions</td></tr>
                        </thead>
                        <tbody><tr><td><h3>{count.totalcount}</h3></td></tr></tbody>

                    </table>
                ))}
            </div>
        );
    }
};

export default ViewTotalActionCount;