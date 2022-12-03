const express = require('express');
const http = require('http');
const socket = require('./socket');

const app = express();

const server = http.createServer(app);

app.get('*', (req, res) => {
  res.sendFile(__dirname, 'index.html');
});

socket(server, app);

server.listen(3000, () => {
  console.log('listening on 3000');
});
