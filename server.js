const express = require('express');
// const path = require('path');
const socket = require('socket.io');
const cors = require('cors');

const tasks = [];

const app = express();
app.use(cors());

app.get('*', (req, res) => {
  res.send('Not found ...');
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket ', socket.id);
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