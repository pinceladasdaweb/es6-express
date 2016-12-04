'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import compression from 'compression';
import favicon from 'serve-favicon';
import logger from 'morgan';
import nunjucks from 'nunjucks';
import index from './routes/index';
import about from './routes/about';

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.disable('x-powered-by');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(__dirname + '/public', {maxAge: 86400000}));

app.use('/', index);
app.use('/about', about);

/**
* Catch 404 and forward to error handler
*/
app.use((req, res, next) => {
  let err = new Error('404 - Not Found');
  err.status = 404;
  next(err);
});

/**
* Error handler
*/
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

export default app;