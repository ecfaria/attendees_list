require('dotenv').config();
const express = require('express');
const routes = require('./routes');

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.static(process.env.OUTPUT_DIR));
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
