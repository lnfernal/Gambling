import server from './server';

const CONNECTIONS = {
  /*
  steamid: [
    socket,
    socket,
    ...
  ]
  */
};

const emitToUser = (steamid, event, data) => {
  if (!CONNECTIONS[steamid]) return false;
  for (let i in CONNECTIONS[steamid]) {
    CONNECTIONS[steamid][i].emit(event, data);
  }
  return i;
}

server.io.on('connection', (socket) => {
  const user = socket.handshake.session.steamUser;
  if (user && user.steamid) {
    
  }

});