var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var volleyball = require('volleyball');
var swig = require('swig');
var routes = require('./routes')

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname +'/public'));
app.use('/bootstrap', express.static( __dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', routes);

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.render(
    'error'
  );
});
app.listen(port, function() {
	console.log("Server is listening intently at port " + port + "...");
});

