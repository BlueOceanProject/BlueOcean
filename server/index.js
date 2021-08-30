const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(bodyParser.json());

var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIATRGXXGCMEPJJGNMK";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: 'us-west-2'
});

var s3 = new AWS.S3();

// app.use(multer({ // https://github.com/expressjs/multer
//   dest: './public/uploads/',
//   limits : { fileSize: 1024*1024 },
//   rename: function (fieldname, filename) {
//     return filename.replace(/\W+/g, '-').toLowerCase();
//   },
//   onFileUploadData: function (file, data, req, res) {
//     var params = {
//       Bucket: 'harmony7',
//       Key: file.name,
//       Body: data
//     };

//     s3.putObject(params, function (perr, pres) {
//       if (perr) {
//         console.log("Error uploading data: ", perr);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// }).any());

var upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: 'harmony7',
      key: function (req, file, cb) {
        const split = file.originalname.split('.')
        cb(null, `${req.body.name}.${split[split.length - 1]}`);
      }
  })
});

app.post('/upload', upload.array('file', 1), function (req, res, next) {
  console.log("===req", req);
  console.log("res", res);
  res.send("Uploaded!");
});

// app.post('/upload', (req, res) => {
//   console.log(req.files)
//   if (req.files !== undefined) { // `image` is the field name from your form
//     res.redirect("/uploads"); // success
//   } else {
//     res.send("error, no file chosen");
//   }
// })


let port = 3000;

require('../database/index');
const { getLatestFeedsByUser } = require('../database/controllers/feeds');

app.get('/feeds', (req, res) => {
  getLatestFeedsByUser(req.query, (err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      // console.log(docs);
      res.status(200).send(docs);
    }
  });
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

