const mailerAuth = {
  user: process.env.MAILER_USERNAME || '',
  pass: process.env.MAILER_PASSWORD || ''
};

const applicationConfig = {
  host: 'http://localhost',
  port: '3000',
  privateUploadDirectory: 'uploads/photos',
  mailer: {
    auth: mailerAuth,
    smtp: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: mailerAuth
    }
  },

  getFullHostname() {
    if (process.env.NODE_ENV !== 'production') {
      return `${this.host}:${this.port}`;
    }
    return this.host;
  }
};

if (process.env.NODE_ENV === 'production') {
  applicationConfig.host = 'https://sheltered-plateau-86472.herokuapp.com';
  applicationConfig.port = process.env.PORT || '8080';
}

export default applicationConfig;
