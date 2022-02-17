import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

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

        // this.setState({token:cookies.get('auth')});
        // this.setState({email:cookies.get('email')});
        // this.setState({roleId:cookies.get('role')});
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
            'http://localhost:5000/GetActionCountByStatus',
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
                    <table>
                        <thead>
                            <tr><td><h1>{count.status}</h1></td></tr>
                        </thead>
                        <tbody><tr><td><h3>{count.totalcount}</h3></td></tr></tbody>

                    </table>
                ))}
            </div>
        );
    }
};

export default ViewTotalActionCount;