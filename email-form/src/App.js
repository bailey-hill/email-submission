import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'name') {
      this.setState({
        name: event.target.value
      });
    }

    if (event.target.id === 'email') {
      this.setState({
        email: event.target.value
      });
    }

    if (event.target.id === 'message') {
      this.setState({
        message: event.target.value
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const newSubmission = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    if (this.state.name.length && this.state.email.length &&
      this.state.message.length > 0) {
      this.props.placeOrder(newSubmission);
      this.setState({
        name: '',
        email: '',
        message: ''
      });
      event.currentTarget.reset();
    }
  }
render() {
  return (
    <div className="App">
      <form noValidate autoComplete="off" className="d-flex justify-content-center
      align-items-center flex-column">
        <TextField className="w-25" id="standard-basic" label="Name" />
        <TextField className="w-25" id="standard-basic" label="Email" />
        <TextField className="w-25" id="standard-basic" label="Message" />
        <button variant="contained" color="primary" disabled={!(this.state.name
        && this.state.email && this.state.message)}
          className="w-25 mt-3 ml-3 btn btn-primary rounded-pill" onSubmit={this.handleSubmit}
          type="submit" value="Submit">Send</button>
      </form>
    </div>
  );
}
}

export default App;
