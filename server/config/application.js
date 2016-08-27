const mailerAuth = {
  user: process.env.MAILER_USERNAME || '',
  pass: process.env.MAILER_PASSWORD || ''
};

const applicationConfig = {
  host: 'http://localhost',
  port: '3000',
  privateUploadDirectory: 'uploads/photos',
  mailer: {
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: true, // use SSL
    auth: mailerAuth
  },

  getFullHostname() {
    if (process.env.NODE_ENV !== 'production') {
      return `${this.host}:${this.port}`;
    }
    return this.host;
  }
};

if (process.env.NODE_ENV === 'production') {
  applicationConfig.host = 'https://tomato-forum.herokuapp.com';
  applicationConfig.port = process.env.PORT || '8080';
}

export default applicationConfig;
