var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  dbName =  process.env.CRYPTOWATCH_DB_NAME || "cryptowatch",
  mongoose = require('mongoose'),
  Crypto = require('./models/cryptoModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/'+dbName.trim()); 

var allowCrossDomain = function(req, res, next) {
    res.header('access-control-allow-origin', '*');
    next();
}

var allowMethods = function(req, res, next) {
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    next();
}

var allowRequestHeaders = function(req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(allowMethods);
app.use(allowRequestHeaders);


var routes = require('./routes/cryptoRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    console.log("route non trouv�e");
    console.log(req.Headers);
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Cryptowatch server started on : http://localhost:' + port);

module.exports = app