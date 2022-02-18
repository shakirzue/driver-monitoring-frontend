import React from 'react'
import Cookies from 'universal-cookie';
import ActionNote from './action-note.js';

class ViewActionNotes extends React.Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
console.log(props);
        this.state = {
            actionNotesList: [],
            actionList: [],
            action_id: props.actionid,
            showCommentForm: false,
            token: cookies.get('auth'),
            email: cookies.get('email'),
            note: '',
            role: cookies.get('role')
           
           
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
        console.log(JSON.stringify({ action_id: this.state.action_id, email: this.state.email, token: this.state.token, isassignee: isuserassignee }));
        fetch(
            process.env.REACT_APP_SERVER_API_URL + "GetActionNoteByEmail", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action_id: this.state.action_id, email: this.state.email, token: this.state.token, isassignee: isuserassignee })
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.actions)

                // const actions = [];
                // const map = new Map();
                // for (const item of response.actions) {
                //     if (!map.has(item.id)) {
                //         map.set(item.id, true);    // set any value to Map
                //         actions.push({
                //             id: item.id,
                //             createdat: item.createdat,
                //             firstname: item.firstname,
                //             disposition_type: item.disposition_type,
                //             notes: item.notes,
                //             Status: item.Status,
                //             ResponseType: item.ResponseType
                //         });
                //     }
                // }
                // const actionNotes = [];
                // response.owner_action_note.forEach((notes) => {

                //     actionNotes.push({ id: notes.action_id, comment: notes.comment });
                // });

                // response.assignee_action_note.forEach((notes) => {

                //     actionNotes.push({ id: notes.action_id, comment: notes.comment });
                // });

                // this.setState({
                //     actionList: actions
                // });
                this.setState({
                    actionNotesList: response.actions
                });
            });
    }

    render() {
        return (
            <div>
{
    <div style={{border: "1px solid"}}>
        {
    this.state.actionNotesList.map(note => (
        
        <p >{note.comment}</p>
      
    ))
    }
    </div>
}


            </div>
        )
    }

}
export default ViewActionNotes;