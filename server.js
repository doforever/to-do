const express = require('express');
// const path = require('path');
// const socket = require('socket.io');

const app = express();

// app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.send('Not found ...');
  // res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

// const io = socket(server);
// io.on('connection', (socket) => {
  
// });