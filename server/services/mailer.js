import nodemailer from 'nodemailer';
import mailerConfig from '../config/mailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: mailerConfig.auth
});

function sendVerification(user) {
  const verificationLink = user.getVerificationLink();
  const mailOptions = {
    from: 'square.bracket.test@gmail.com',
    to: user.local.email,
    subject: '🌈 Please verify 👬',
    html: `<b>Hello world 🐴</b>
      <span>Please click on this verification link
      <a href="${verificationLink}">${verificationLink}</a>
      </span>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    return console.log('Message sent: ' + info.response);
  });
}

export default {
  sendVerification
};
