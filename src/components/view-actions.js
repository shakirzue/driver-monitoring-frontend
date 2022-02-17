import React from 'react'
import Cookies from 'universal-cookie';
import ActionNote from './action-note.js';

class ViewActions extends React.Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();

        this.state = {
            actionNotesList: [],
            actionList: [],

            action_id: 0,
            showCommentForm: false,
            token: cookies.get('auth'),
            email: cookies.get('email'),
            note: '',
            role: cookies.get('role'),
            responseTypeList: [{ Id: 0, Description: '---Select from list-----' }],
            StatusList: [{ Id: 0, Status: '---Select from list-----' }]
        };
    }

    componentDidMount() {
       
        var isuserassignee = false;
        if (this.state.role === '1') {
            isuserassignee = false;
        }
        else {
            isuserassignee = true;
        }
        
        fetch(
            "http://localhost:5000/GetActionByEmail", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, token: this.state.token, isassignee: isuserassignee })
        })
            .then((response) => response.json())
            .then((response) => {
                const actions = [];
                const map = new Map();
                for (const item of response.actions) {
                    if (!map.has(item.id)) {
                        map.set(item.id, true);    // set any value to Map
                        actions.push({
                            id: item.id,
                            createdat: item.createdat,
                            firstname: item.firstname,
                            disposition_type: item.disposition_type,
                            notes: item.notes,
                            Status: item.Status
                        });
                    }
                }            
                const actionNotes = [];
                response.actions.forEach((notes) => {

                    actionNotes.push({ id: notes.id, comment: notes.response_note });
                });
               
                this.setState({
                    actionList: actions
                });
                this.setState({
                    actionNotesList: actionNotes
                });                
            });
        if (isuserassignee) {
            console.log(isuserassignee);
            fetch(
                "http://localhost:5000/GetResponseType", {
                method: 'Get'
            })
                .then((response) => response.json())
                .then((response) => {

                    const newList = this.state.responseTypeList.concat(response.result);
                    console.log(newList);
                    this.setState({
                        responseTypeList: newList
                    });
                });
        }
        else{
            console.log(isuserassignee);
            fetch(
                "http://localhost:5000/GetActionStatus", {
                method: 'Get'
            })
                .then((response) => response.json())
                .then((response) => {

                    const newList = this.state.StatusList.concat(response.result);
                    console.log(newList);
                    this.setState({
                        StatusList: newList
                    });
                });
        }
    }

    addNotes = (actionId) => {
        this.setState({ showCommentForm: true, action_id: actionId });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'action_id': this.state.action_id, 'note': this.state.note, email: this.state.email, token: this.state.token })
        };
        fetch('http://localhost:5000/CreateActionNotes', requestOptions).then(function (response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }

    submitResponseType = (event) => {
        console.log(event.target.getAttribute("actionid"))
        console.log(event)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'action_id': event.target.getAttribute("actionid"), 'response_type_id': event.target.value })
        };
        fetch('http://localhost:5000/UpdateActionResponseType', requestOptions).then(function (response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }

    updateActionStatus = (event) => {
        console.log(event.target.getAttribute("actionid"))
        console.log(event)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'action_id': event.target.getAttribute("actionid"), 'status_id': event.target.value })
        };
        fetch('http://localhost:5000/UpdateActionStatus', requestOptions).then(function (response) {
            console.log(response)
            return response.json();
        });

        event.preventDefault();
    }
    render() {
        const { showCommentForm } = this.state;
        const { actionNotesList } = this.state;
        //     const tableStyle = {
        //         'border-collapse': 'collapse';
        // font-family: 'Tahoma, Geneva, sans-serif';
        //       };
        //       const tdStyle = {
        //         padding: '15px';
        //       };
        //       const divStyle = {
        //         color: 'blue',
        //         backgroundImage: 'url(' + imgUrl + ')',
        //       };
        return (
            <div className="container">
                <h1>Driver monitoring: All monitoring actions</h1>               
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Created by</th>
                            <th>Dispostion Type</th>
                            <th>Note</th>
                            <th>Status</th>
                            {
                                this.state.role != 1 ?
                                    <th>Response Type</th>
                                    : <th>Status</th>}
                            <th>Response note</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.actionList.map(action => (
                            <tr key={action.Id}>
                                <td style={{ width: '100%', border: "1px solid" }}>{action.createdat}</td>
                                <td style={{ width: '100%', border: "1px solid" }}>{action.Firstname}</td>
                                <td style={{ width: '100%', border: "1px solid" }}>{action.disposition_type}</td>
                                <td style={{ width: '100%', border: "1px solid" }}>{action.notes}</td>
                                <td style={{ width: '100%', border: "1px solid" }}>{action.Status}</td>
                                {
                                    this.state.role != 1 ?
                                        <td style={{ width: '100%', border: "1px solid" }}>
                                            <select name='response_type_id' actionid={action.id} onChange={e => this.submitResponseType(e)}>
                                                {this.state.responseTypeList.map(response => (
                                                    <option key={response.Id} name='response_type_id' value={response.Id} >{response.Description}</option>
                                                ))}
                                            </ select>
                                        </td>
                                        : <td style={{ width: '100%', border: "1px solid" }}>
                                        <select name='status_id' actionid={action.id} onChange={e => this.updateActionStatus(e)}>
                                            {this.state.StatusList.map(status => (
                                                <option key={status.Id} name='status_id' value={status.Id} >{status.Status}</option>
                                            ))}
                                        </ select>
                                    </td>
                                }

                                <td>{
                                    this.state.actionNotesList.filter(note => note.id == action.id).map((note, index) => (
                                        <p>
                                            {note.comment == null ? "" : note.comment}
                                        </p>

                                    ))}</td>


                                <td><button id={action.id}
                                    style={{ width: '100%', border: "1px solid" }}
                                    onClick={() => this.addNotes(action.id)}
                                >
                                    Edit
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    showCommentForm == true ?
                        <ActionNote actionid={this.state.action_id} role={this.state.role} />
                        :
                        <></>
                }



            </div>

        );
    };

}

export default ViewActions;