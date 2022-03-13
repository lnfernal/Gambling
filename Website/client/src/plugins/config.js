const config = {
  api: 'https://api.steam.pevo.xyz:3000',
};

export default {
  install(app) {
    // eslint-disable-next-line
    app.prototype.$config = config;
  },
};
