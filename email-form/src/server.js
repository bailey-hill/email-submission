const AWS = require('aws-sdk');
const mailer = require("./mailer");
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

AWS.config.update({ region: 'us-west-2' });

app.post('https://e6865glu98.execute-api.us-west-2.amazonaws.com/new-email-stage', (req, res, next) => {
  return mailer.sendMail('baileyowenhill@gmail.com', ['reciever@email.com'], req.body)
    .then(() => res.send(req.body))
    .catch(next);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
