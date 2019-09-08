require('dotenv').config();
const hbs = require('express-handlebars');
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
    this.express.engine(
      'hbs',
      hbs({
        defaultLayout: 'default',
        extname: '.hbs',
        layoutsDir: 'views/layouts'
      })
    );
    this.express.set('view engine', 'hbs');
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
