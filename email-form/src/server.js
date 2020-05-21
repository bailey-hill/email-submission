const AWS = require('aws-sdk');
const mailer = require("./mailer");
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

AWS.config.update({ region: 'eu-west-2' }); // Set the region that you configured in AWS

// Our end-point for handling the enquiry request
app.post('/api/contact', (req, res, next) => {
  return mailer.sendMail('baileyowenhill@gmail.com', ['reciever@email.com'], req.body)
    .then(() => res.send(req.body))
    .catch(next);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
