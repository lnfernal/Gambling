/* eslint-disable */

import { io } from 'socket.io-client';

export default {
  install(app) {
    app.prototype.$socket = io(`wss://${app.prototype.$config.socket}`, {transports: ['websocket'], upgrade: false, secure: true});
  },
};
