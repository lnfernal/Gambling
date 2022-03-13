const config = {
  name: 'Nazwa',
  domain: '192.168.0.101',
  api: 'https://192.168.0.101:3000/api/v1',
  socket: '192.168.0.101:3000',
};

export default {
  install(app) {
    // eslint-disable-next-line
    app.prototype.$config = config;
  },
  config,
};
