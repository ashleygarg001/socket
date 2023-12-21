const socketIO = require('socket.io')(3009, {
  cors: {
    origin: ['http://192.168.0.100:3007', 'http://localhost:3007']
  }
})

socketIO.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('draw', (drawingData) => {
    console.log('User playing');
    socketIO.emit('draw', drawingData);
  });
});