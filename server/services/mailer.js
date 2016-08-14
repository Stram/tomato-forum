import nodemailer from 'nodemailer';
import applicationConfig from '../config/application';

let transporter;
if (applicationConfig.mailer.auth.user !== '') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: applicationConfig.mailer.auth
  });
}

function sendVerification(user) {
  user.getVerificationLink().then((verificationLink) => {
    const mailOptions = {
      from: 'square.bracket.test@gmail.com',
      to: user.local.email,
      subject: '🌈 Please verify 👬',
      html: `<b>Hello world 🐴</b>
      <span>Please click on this verification link
      <a href="${verificationLink}">${verificationLink}</a>
      </span>`
    };

    if (transporter) {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        return console.log('Message sent: ' + info.response);
      });
    }
  });
}

export default {
  sendVerification
};
