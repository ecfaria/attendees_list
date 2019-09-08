const routes = require('express').Router();
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });
const UploadController = require('./app/controllers/UploadController');

routes.post('/results', upload.single('list'), (req, res) => {
  if (req.file === undefined) {
    res.status(400).json({ error: 'No file was provided' });
  } else {
    UploadController.getAttendes(req, res);
  }
});
routes.get('/', (req, res) => {
  res.render('home');
});

module.exports = routes;
