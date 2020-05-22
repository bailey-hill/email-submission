import React from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import apiKeys from './config.json'
// import sendMail from './email.js';

import AWS from 'aws-sdk';
// import config from '../config.json';
const SESConfig = {
  apiVersion: 'latest',
  accessKeyId: apiKeys.AWS_ACCESS_KEY,
  secretAccessKey: apiKeys.AWS_SECRET_KEY,
  region: apiKeys.region
}
// const aws = require('aws-sdk');
// aws.config.loadFromPath("../config.json")
const ses = new AWS.SES(SESConfig);
// AWS.config.update({
//   region: 'us-west-2',
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: apiKeys.AWS_POOL_ID
//   })
// });

// var myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: apiKeys.AWS_POOL_ID });
// var myConfig = new AWS.Config({
//   credentials: myCredentials, region: 'us-west-2'
// });

// AWS.config.update({
//   region: 'us-east-2'
// });


// @param {*} callback

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

console.log(ses)

// sendMail(function (err, data) {
//   if (err) {
//     console.log('send mail failed');
//   } else {
//     console.log('send mail succeeded');
//   }
// })

// const post = async (data) => {
//   const { url } = data;

//   delete data.url;

//   const params = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
//   };

//   const response = await fetch(url, params);

//   if (response.status < 200 && response.status >= 300) {
//     const res = await response.json();

//     throw new Error(res);
//   }

//   return response.json();
// };

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
      }, newSubmission)
      // post(newSubmission)
      //   .then(() => {
      //     this.setState({ error: null, submitted: true });
      //   })
      //   .catch(error => {
      //     this.setState({ error: error.message, submitted: false });
      //   });
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
