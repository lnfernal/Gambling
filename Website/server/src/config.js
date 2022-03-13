const config = {};

config.name = 'Bez nazwy';
config.domain = 'steam.pevo.xyz';

config.port = 3000;

config.certificatePath = {
  socket: {
    key: `${__dirname}/steam.pevo.xyz/privkey.pem`,
    cert: `${__dirname}/steam.pevo.xyz/cert.pem`,
  },
  api: {
    key: `${__dirname}/api.steam.pevo.xyz/privkey.pem`,
    cert: `${__dirname}/api.steam.pevo.xyz/cert.pem`,  
  }
};

export default config;