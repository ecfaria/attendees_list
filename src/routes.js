const routes = require('express').Router();
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const UploadController = require('./app/controllers/UploadController');

routes.post('/', upload.single('list'), UploadController.getAttendes);

module.exports = routes;
