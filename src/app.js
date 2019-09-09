require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes');

global.__basedir = path.dirname(__dirname);

class AppController {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.static(`${__dirname}/app/public/`));
    this.express.use('/js', express.static(`${__dirname}/app/public/js/`));
    this.express.use(express.static(process.env.OUTPUT_DIR));
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
