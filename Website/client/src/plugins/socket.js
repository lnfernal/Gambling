/* eslint-disable */

import { io } from 'socket.io-client';

let socket;

const sendSyncTimeRequest = (app) => {
  const startTime = Date.now();
  socket.emit('startPing', serverTime => {
    app.prototype.$connection.ping = Date.now() - startTime;
    app.prototype.$connection.serverTimeOffset = Date.now() - serverTime - app.prototype.$connection.ping;
  });
};

let syncTimeInterval;

export default {
  install(app) {
    app.prototype.$connection = {};
    app.prototype.$connection.ping = 0;
    app.prototype.$connection.serverTimeOffset = 0;
    app.prototype.$socket = socket = io(`wss://${app.prototype.$config.socket}`, {transports: ['websocket'], upgrade: false, secure: true});
    app.prototype.$socket.on('connect', () => {
      app.prototype.$toast.success('Connected');
      sendSyncTimeRequest(app);
      syncTimeInterval = setInterval(sendSyncTimeRequest, 15000, app);
    });
    app.prototype.$socket.on('disconnect', () => {
      app.prototype.$toast.error('Disconnected');
      clearInterval(syncTimeInterval);
    });
  },
};
