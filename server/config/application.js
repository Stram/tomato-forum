const applicationConfig = {
  host: 'localhost',
  port: '3000',
  privateUploadDirectory: 'uploads/photos',

  getFullHostname() {
    if (this.port !== '443') {
      return `${this.host}:${this.port}`;
    }
    return this.host;
  }
};

if (process.env.NODE_ENV === 'production') {
  applicationConfig.host = 'https://sheltered-plateau-86472.herokuapp.com/';
  applicationConfig.port = process.env.PORT;
}

export default applicationConfig;
