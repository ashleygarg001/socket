const socketIO = require('socket.io')(3003, {
  cors: {
    origin: ['http://192.168.0.100:3004', 'http://localhost:3004']
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