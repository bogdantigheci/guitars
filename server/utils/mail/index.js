const mailer = require('nodemailer');
const { welcome } = require('./welcome_template');
require('dotenv').config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: 'Guitars <racingpigeonsdis@gmail.com>',
        to,
        subject: `Welcome to Racing Pigeons ${name}`,
        html: welcome()
      };
      break;
    case 'purchase':
      data = {
        from: 'Guitars <racingpigeonsdis@gmail.com>',
        to,
        subject: `Thank you for your order ${name}`,
        html: purchase(actionData)
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'racingpigeonsdis@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('mail sent');
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
