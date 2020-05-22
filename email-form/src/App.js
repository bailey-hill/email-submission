import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import AWS from 'aws-sdk';

const SESConfig = {
  apiVersion: 'latest',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: "us-west-2"
}

const ses = new AWS.SES(SESConfig);

var sendMail = function (callback, userInput) {
  var params = {};
  var destination = {
    "ToAddresses": [userInput.email]
  };
  var templateData = {};
  templateData.userName = userInput.name;
  templateData.message = userInput.message;
  params.Source = "baileyowenhill@gmail.com";
  params.Destination = destination;
  params.Template = "testtemplate";
  params.TemplateData = JSON.stringify(templateData)

  ses.sendTemplatedEmail(params, function (email_err, email_data) {
    if (email_err) {
      console.error('Failed to send the email: ' + email_err);
      callback(email_err, email_data)
    } else {
      console.info('Successfully sent the email : ' + JSON.stringify(email_data));
      callback(null, email_data);
    }
  })
}

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
      url: '/new-email-stage',
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };
    if (this.state.name && this.state.email &&
      this.state.message) {
      console.log(JSON.stringify(newSubmission));
      sendMail(function (err, data) {
        if (err) {
          console.log('send mail failed');
        } else {
          console.log('send mail succeeded');
        }
      }, newSubmission);
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
            <TextField id="name" onChange={this.handleChange} className="w-100" label="Name" />
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
            <Button className="w-50 mr-1 mt-2" type="reset" variant="contained">
              Cancel</Button>
            <Button variant="contained" color="primary" disabled={!(this.state.name
              && this.state.email && this.state.message)}
              className="w-50 mt-2 ml-1" onSubmit={this.handleSubmit}
              type="submit" value="Submit" data-toggle="modal" data-target="#exampleModal">
              Send
            </Button>
          </div>
        </form>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Message received!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
            Thanks for your message! We will be in contact with you shortly.
              </div>
              <div className="modal-footer">
                <Button variant="contained" type="button" className="btn btn-secondary"
                data-dismiss="modal">Close</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
