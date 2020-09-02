var createError = require('http-errors');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var webServerConfig = require('../config/web-server.js');
var router = require('../routes/router.js');
var indexRouter = require('../routes/index.js');
var app;
var httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    app = express();
    httpServer = http.createServer(app);

    // Configs
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //Middlewears
    app.use(logger('dev'));
    app.use(bodyParser.json());  
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', indexRouter);
    app.use('/osi/api', router);
    app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
    });
    

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });
  
    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
  });
}
module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;


