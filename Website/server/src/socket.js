import server from './server';

server.io.on('connection', (socket) => {
  console.log('Connected');
});