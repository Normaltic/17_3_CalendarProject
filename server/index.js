
// Load Packages
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import webpack from 'webpack';
const WebpackDevServer = require('webpack-dev-server');

// Configure Port
var port = process.env.PORT || 6000;
var devPort = process.env.DEVPORT || 6001;

// Connect DataBase
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error);
db.once('open', function() {
	console.log("Connected to DB");
});

mongoose.connect('mongodb://localhost:27017/normaltest');
// Express setting
var server = express();

// Configure server to use Middleware; 
server.use(morgan('dev'));
server.use(bodyParser.json());

// Set secret key
server.set('jwt-secret', 'NormaltiC');


//use setting
server.use('/', express.static(path.resolve(__dirname, '../public')));
/*server.get('*', (req, res, next) => {
	if( req.path.split('/')[1] === 'static' ) return next();
	res.sendFile(path.resolve( __dirname, '../public/index.html'));
});*/

server.use('/api', router);

var Start = server.listen( port, function() {
	console.log("Server has started on port " + port);
});

//devServer Setting 
const config = require('../webpack.dev.config');
const compiler = webpack(config);

//open devServer
const devServer = new WebpackDevServer(compiler, config.devServer);
devServer.listen(devPort, () => {
	console.log('=-------------------------Client Server has open ' + devPort );
});
