const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const { ACCESS_KEY, SECRET_KEY } = require('../key.js')

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
      const split = file.originalname.split('.')
      cb(null, `${req.body.name}.${split[split.length - 1]}`);
    }
  }),
  limits: { fieldSize: 2 * 1024 * 1024 }


  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //       cb(null, 'uploads');
  //   },
  //   filename: (req, file, cb) => {
  //     console.log(req)
  //     console.log(file)
  //     const split = file.originalname.split('.')
  //     cb(null, `${req.body.name}.${split[split.length - 1]}`);
  //   }
  // })
});

app.post('/upload', upload.any(), function (req, res, next) {
  res.send("Uploaded!");
});


let port = 3000;

require('../database/index');
const { getLatestFeedsByUser } = require('../database/controllers/feeds');

app.get('/feeds', (req, res) => {
  getLatestFeedsByUser(req.query, (err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(docs);
    }
  });
});

const { addToFeed } = require('../database/controllers/feeds');

app.post('/feeds', (req, res) => {
  console.log('got to server index', req.body)
  addToFeed(req.body, (err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

const { getUserByUserId } = require('../database/controllers/users');

app.get('/user', (req, res) => {
  getUserByUserId(req.query, (err, docs) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(docs);
    }
  });
});

const { makePublished } = require('../database/controllers/users');

app.put('/users', (req, res) => {
  makePublished(req.body, (err, docs) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.status(200).send('updated');
    }
  })
})

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

