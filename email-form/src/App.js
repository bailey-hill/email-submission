import React from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';

const post = async (data) => {
  const { url } = data;

  delete data.url;

  const params = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  const response = await fetch(url, params);

  if (response.status < 200 && response.status >= 300) {
    const res = await response.json();

    throw new Error(res);
  }

  return response.json();
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      submitted: false,
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
      url: 'https://e6865glu98.execute-api.us-west-2.amazonaws.com/new-email-stage',
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };
    if (this.state.name.length && this.state.email.length &&
      this.state.message.length > 0) {
      post(newSubmission)
        .then(() => {
          this.setState({ error: null, submitted: true });
        })
        .catch(error => {
          this.setState({ error: error.message, submitted: false });
        });
    }
      this.setState({
        name: '',
        email: '',
        message: ''
      });
      event.currentTarget.reset();
    }

render() {
  return (
    <div className="App">
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off" className="d-flex justify-content-start
      align-items-center flex-column mt-2">
        <div className="w-25">
        <TextField id="name" onChange={this.handleChange} className="w-100"  label="Name" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.name ? 'hidden' : 'visible' }}>
            A name is required.</div>
        </div>
        <div className="w-25">
        <TextField id="email" onChange={this.handleChange} className="w-100" label="Email" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.email ? 'hidden' : 'visible' }}>
            An email is required.</div>
        </div>
          <div className="w-25">
        <TextField id="message" onChange={this.handleChange} className="w-100" label="Message" />
          <div className="text-left required text-general mt-1" style={{ visibility: this.state.message ? 'hidden' : 'visible' }}>
            A message is required.</div>
        </div>
        <div className="w-25 d-flex flex-row">
          <input className="w-50 mr-1 mt-3 btn btn-light rounded-pill" type="reset" value="Cancel" />
          <button variant="contained" color="primary" disabled={!(this.state.name
            && this.state.email && this.state.message)}
            className="w-50 mt-3 ml-1 btn btn-primary rounded-pill" onSubmit={this.handleSubmit}
            type="submit" value="Submit">Send</button>
        </div>
      </form>
    </div>
  );
}
}

export default App;
