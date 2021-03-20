const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: `/api/${process.env.API_VERSION}/auth`,
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
    // this.app.use(this.paths.auth, require('../routes/auth'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

}

module.exports = Server;