const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const { ACCESS_KEY, SECRET_KEY } = require('../key.js')
const { insertSongForUser } = require('../database/controllers/users.js')

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(bodyParser.json());

var accessKeyId = process.env.AWS_ACCESS_KEY || ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY || SECRET_KEY;
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: 'us-west-2'
});

var s3 = new AWS.S3();

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'harmony7',
      key: function (req, file, cb) {
        // console.log(file)
        const split = file.originalname.split('.');
        cb(null, `${req.body.name}.${split[split.length - 1]}`);
      }
  }),
  limits: { fieldSize: 2 * 1024 * 1024 }

  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //       cb(null, 'uploads');
  //   },
  //   filename: (req, file, cb) => {
  //     const split = file.originalname.split('.')
  //     cb(null, `${req.body.name}.${split[split.length - 1]}`);
  //   }
  // })
});

app.post('/upload', upload.any(), function (req, res, next) {
  // console.log(req.files[0].location);
  // console.log(req.id);
  insertSongForUser(req.id, req.files[0].location, req.body.name);
  res.send("Uploaded!");
});


let port = 3000;

require('../database/index');
const { getLatestFeedsByUser } = require('../database/controllers/feeds');
const { postSignUpUser } = require('../database/controllers/users');

app.get('/feeds', (req, res) => {
  getLatestFeedsByUser(req.query, (err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(docs);
    }
  });
});

app.post('/users', (req, res) => {
  postSignUpUser(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

