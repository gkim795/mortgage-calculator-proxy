const nr = require('newrelic');
const express = require('express');
const httpProxy = require('http-proxy');
const port = 8080;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3000';  //serves mortgage calculator
// const serverTwo = 'http://ec2-34-232-109-92.compute-1.amazonaws.com/';  //serves home description
// const serverThree = 'http://ec2-13-56-210-238.us-west-1.compute.amazonaws.com/'; //serves nearby homes
// const serverFour = 'http://ec2-52-53-188-116.us-west-1.compute.amazonaws.com/'; //serves image carousel

const app = express();

app.use('/homes/:homesid', express.static('./public'));

app.all("/api/mortgageCalculator/:id", function(req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: serverOne});
});

// app.all("/api/homes/:homesid/detail-information", function(req, res) {
//   console.log('redirecting to Server2');
//   apiProxy.web(req, res, {target: serverTwo});
// });

// app.all("/nearByHomes", function(req, res) {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: serverThree});
// });

// app.all("/images/:homesid", function(req, res) {
//   console.log('redirecting to Server4');
//   apiProxy.web(req, res, {target: serverFour});
// });

app.listen(port, () => {
  console.log(`listening at ${port}`);
});

