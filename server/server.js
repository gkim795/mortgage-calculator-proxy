const express = require('express');
const httpProxy = require('http-proxy');
const port = 8080;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3000';  //serves mortgage calculator
const serverTwo = 'http://localhost:3001';  //serves home description
const serverThree = 'http://localhost:3002'; //serves nearby homes
const serverFour = 'http://localhost:3003'; //serves image carousel

const app = express();

app.use(express.static('./public'));

app.all("/api/homes/1/prices", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: serverOne});
});

app.all("/api/homes/:index/detail-information", function(req, res) {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, {target: serverTwo});
});

app.all("/nearbyhomes", function(req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: serverThree});
});

app.all("/images/:houseID", function(req, res) {
  console.log('redirecting to Server4');
  apiProxy.web(req, res, {target: serverFour});
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});

