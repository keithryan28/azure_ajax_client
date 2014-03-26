
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

// I am going to put all the functions that handle API calls
// in their own package
var api = require('./routes/api');
var http = require('http');
var path = require('path');

var app = express();

// Let's require the mongodb package
var mongo = require('mongodb');

// Get the MongoClient Object
var mongoClient = mongo.MongoClient;

// Connect to the db. The callback function will be passed two arguments: err - which
// will contain error information, and db - which will contain a connection to the
// mongodb Database
mongoClient.connect(process.env.CUSTOMCONNSTR_MONGODB_URI, function(err, db) {
  if(!err) {
    console.log("We are connected");
    // Store the connection to the mongodb database on the aplication object
    // under the name db so that I can access in another file
    app.set('db', db);
  }
  else {
    throw err;
  }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// we need the following line in order to extract data send via
// a HTTP POST message
app.use(express.bodyParser());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());

  // This is a real handy setting, it makes the html that jade produces
  // "pretty" i.e. not all on one line
  app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/getData', routes.getData);
app.get('/getDataBlock', routes.getDataBlock);
app.get('/getDataBlockChart', routes.getDataBlockChart);

app.post('/api/saveData', api.saveData);
app.post('/api/getData', api.getData);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
