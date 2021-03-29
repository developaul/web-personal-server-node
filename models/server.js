const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      user: `/api/${process.env.API_VERSION}/user`,
    }

    this.connectDB();

    this.middlewares();

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

}

module.exports = Server;