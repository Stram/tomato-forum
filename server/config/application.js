export default {
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
