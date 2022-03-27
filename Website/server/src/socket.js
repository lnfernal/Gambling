import server from './server';
import Chat from './chat';
import Wheel from './wheel';

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

const getOnlineUsers = () => {
  let users = 0;
  for (let i in CONNECTIONS) {
    users += 1;
  }
  return users;
}

Chat.initIO(server.io);
Wheel.initIO(server.io);

server.io.on('connection', (socket) => {
  const user = socket.handshake.session.steamUser;
  Chat.initSocket(socket);
  Wheel.initSocket(socket);

  socket.on('startPing', callback => callback(Date.now()));

  if (user && user.steamid) {
    const steamid = user.steamid;
    if (!CONNECTIONS[steamid]) CONNECTIONS[steamid] = [];
    CONNECTIONS[steamid].push(socket);
    socket.on('disconnect', function () {
      if (!CONNECTIONS[steamid]) return;
      for (let i in CONNECTIONS[steamid]) {
        if (CONNECTIONS[steamid][i] == socket) CONNECTIONS[steamid].splice(i, 1);
        if (CONNECTIONS[steamid].length < 1) delete CONNECTIONS[steamid];
      }
    });
  }
});