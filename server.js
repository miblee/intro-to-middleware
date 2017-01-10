var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var app = express();

app.use(function(req, res, next){
  console.log('1. Incoming request. Hello!');
  req.user = 'Sam';
  next();
})

app.use(function(req, res, next){
  console.log('2.', req.user);
  next();
})

app.use(function(req, res, next){
  console.log('3. I am next. ', req.metho, req.url, req.user);
  next();
})

// built in express middleware.
// if a request URL matches a file in public, serve it.
// Otherwise call next.
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname + '/public'))


// if public has an index.html this won't be served.
app.get('/', function(req, res) {
  res.send("Hello from server.js")
});

app.get('/about', function(req, res){
  res.redirect('/bio.html')
})


var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
