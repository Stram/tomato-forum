export default {
  host: 'localhost',
  port: '3000',

  getFullHostname() {
    if (this.port !== '8080') {
      return `${this.host}:${this.port}`;
    }
    return this.host;
  }
};
