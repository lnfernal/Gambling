const config = {};

config.name = 'Bez nazwy';
config.siteDomain = '192.168.0.101';
config.sitePort = '8001';

config.domain = '192.168.0.101';
config.apiDomain = '192.168.0.101:3000/api';
config.port = 3000;

config.chat = {
  maxMessages: 32,
  maxChars: 128,
};

config.secret = '235u389J$I3r92j3902D2394$($sdf';

config.MySQL = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'gambling',
  connectionLimit: 10,
  debug: false
}

config.ApiKey = '74F07D6BDD3FB5D66D2D880F40560384';

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