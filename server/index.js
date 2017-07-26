const express = require('express');
const path = require('path');

const server = express();
const port = 4000;

server.use('/', express.static(path.resolve(__dirname, '../build')));
server.get('*', (req, res, next) => {
    if( req.path.split('/')[1] === 'static' ) return next();
    res.sendFile(path.resolve( __dirname, '../build/index.html'));
})

server.listen(port, function () {
    console.log('server has connected on' + port);
});