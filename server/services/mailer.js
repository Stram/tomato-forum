import nodemailer from 'nodemailer';
import applicationConfig from '../config/application';

let transporter;
if (applicationConfig.mailer.auth.user !== '') {
  transporter = nodemailer.createTransport(applicationConfig.mailer);
}

function sendVerification(user) {
  user.getVerificationLink().then((verificationLink) => {
    const mailOptions = {
      from: 'square.bracket.test@gmail.com',
      to: user.local.email,
      subject: '🌈 Please verify 👬',
      html: `<b>Hello beautiful! 🐴</b>
      <span>Please click on this verification link
      <a href="${verificationLink}">VERIFY!</a>
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
