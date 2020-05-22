const aws = require('aws-sdk');
aws.config.loadFromPath("../config.json")
const ses = new aws.SES();

// @param {*} callback

var sendMail = function (callback) {
  var params = {};
  var destination = {
    "ToAddresses": ["baileyowenhill@gmail.com"]
  };
  var templateData = {};
  templateData.userName = "Bailey";
  templateData.message = "Hello!";
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

sendMail(function (err, data) {
  if (err) {
    console.log('send mail failed');
  } else {
    console.log('send mail succeeded');
    }
})
