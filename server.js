var express = require('express');
const logger = require('morgan');
const cors = require("cors");
const http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var corsOption = {
    origin :'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    exposedHeaders: [
      "Authorization",
      "Content-Type",
      "x-auth-token",
      "authorization"
    ],
    credentials: true,
  };
  app.use(cors(corsOption));
  app.use("*",cors(corsOption));

  const db = require("./APIs/models");
db.sequelize.sync();

app.get('/', function(req, res) {
  res.send('.::Working_-_Parking::.')
});
//   app = express(),
//   port = process.env.PORT || 3000;

// app.listen(port);
app.use(require("./APIs/routes/indexRoute.js"));
const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.timeout = 500000;
console.info("ok",Date());
console.log('testing.... ' + port);
module.exports = app;