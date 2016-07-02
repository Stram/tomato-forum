const applicationConfig = {
  host: 'localhost',
  port: '3000',
  privateUploadDirectory: 'uploads/photos',

  getFullHostname() {
    if (this.port !== '8080') {
      return `${this.host}:${this.port}`;
    }
    return this.host;
  }
};

if (process.env.NODE_ENV === 'production') {
  applicationConfig.host = 'sheltered-plateau-86472.herokuapp.com';
  applicationConfig.post = '8080';
}

export default applicationConfig;
