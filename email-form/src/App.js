import React from 'react';
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
      email: this.state.email,
      message: this.state.message
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
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off" className="d-flex justify-content-start
      align-items-center flex-column mt-2">
        <div className="w-25">
        <TextField id="name" onChange={this.handleChange} className="w-100"  label="Name" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.name ? 'hidden' : 'visible' }}>A name is required.</div>
        </div>
        <div className="w-25">
        <TextField id="email" onChange={this.handleChange} className="w-100" label="Email" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.email ? 'hidden' : 'visible' }}>A name is required.</div>
        </div>
          <div className="w-25">
        <TextField id="message" onChange={this.handleChange} className="w-100" label="Message" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.message ? 'hidden' : 'visible' }}>A name is required.</div>
        </div>
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
