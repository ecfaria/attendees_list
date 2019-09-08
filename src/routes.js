const routes = require('express').Router();
const UploadController = require('./app/controllers/UploadController');

routes.get('/', UploadController.getAttendes);

module.exports = routes;
