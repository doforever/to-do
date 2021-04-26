const express = require('express');
// const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const tasks = [];

const app = express();
app.use(cors());
// app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.send('Not found ...');
  // res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', task => {
    console.log(`${socket.id} adds ${task}`);
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });
  socket.on('removeTask', i => {
    console.log(`${socket.id} removes task ${i}`);
    tasks.splice(i,1);
    socket.broadcast.emit('removeTask', i);
  });
});