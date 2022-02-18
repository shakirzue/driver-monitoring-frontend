import React from 'react'
import Cookies from 'universal-cookie';

class MyForm extends React.Component {
  constructor(props) {
    const cookies = new Cookies();
    super(props);
    this.state = {
      disposition_type_id: 0,
      response_type_id: null,
      token: cookies.get('auth'),
      email: cookies.get('email'),
      note: '',
      assignee: 0,
      stakeholdersList: [{ Id: 0, name: " --- Select a State ---", User_Type: "" }],
      dispositionList: [{ Id: 0, Description: " --- Select a State ---" }]
    };
  }

  componentDidMount() {
    fetch(
      process.env.REACT_APP_SERVER_API_URL+"GetStakeholders", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, token: this.state.token })
    })
      .then((response) => response.json())
      .then((response) => {

        const newList = this.state.stakeholdersList.concat(response.result);      
        this.setState({
          stakeholdersList: newList
        });
      });


    fetch(
      process.env.REACT_APP_SERVER_API_URL+"GetDisposition", {
      method: 'Get'
    })
      .then((response) => response.json())
      .then((response) => {
        const newList = this.state.dispositionList.concat(response.result);       
        this.setState({
          dispositionList: newList
        });
      });
  }


  handleChange = (event) => {   
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    //alert('A form was submitted: ' + this.state);
    console.log(JSON.stringify(this.state));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
    fetch(process.env.REACT_APP_SERVER_API_URL+'CreateAction', requestOptions).then(function (response) {
      console.log(response)
      return response.json();
    });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <label>
          Select Stakeholder type:
        </label>
        <select name='assignee' onChange={e => this.handleChange(e)}>
          {this.state.stakeholdersList.map(stakeholder => (
            <option key={stakeholder.Id} name='assignee' value={stakeholder.Id} >{stakeholder.name}</option>
          ))}
        </ select>

        <label>
          Select disposition type:
        </label>
        <select name='disposition_type_id' onChange={e => this.handleChange(e)}>
          {this.state.dispositionList.map(disposition => (
            <option key={disposition.Id} name='disposition_type_id' value={disposition.Id} >{disposition.Description}</option>
          ))}
        </ select>
        {/* <label>
          Select response type:
          <input type="text" value={this.state.response_type_id} name="response_type_id" onChange={this.handleChange} />
        </label> */}
        <label>
          Enter note:
          <input type="text" value={this.state.note} name="note" onChange={this.handleChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MyForm;