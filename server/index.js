require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const aws = require("aws-sdk");
const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  S3_BUCKET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = process.env;
const soundCtrl = require('./ctrl/soundCtrl')
const authCtrl = require('./ctrl/authCtrl')
const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);


// AUTH Endpoints 
app.post('/auth/register', authCtrl.registerUser)
app.post('/auth/login', authCtrl.loginUser)
app.put('/auth/user')
app.delete('/auth/logout')



// SOUND CTRL Endpoints
app.get('/api/samples')
app.get('/api/samplepack')
app.get('/api/samplepack/:samplepackid')
app.post('/api/sample', soundCtrl.createSample)
app.post('/api/samplepack')



// Endpoint for uploading audio files
app.get("/api/signs3", (req, res) => {
  aws.config = {
    region: AWS_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.status(200).send(returnData);
  });
});
///////////////////////////////////////

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db bruh");
  app.listen(SERVER_PORT, () =>
    console.log(`server activated port ${SERVER_PORT}`)
  );
});
