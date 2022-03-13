import server from './server';
import query from './database';
import config from './config';
import expressSession from 'express-session';
import steamLogin from 'steam-login';

const api = server.app;

api.use(expressSession({ resave: false, saveUninitialized: false, secret: '234893yfh3784rch3789r' }));
api.use(steamLogin.middleware({
    realm: `https://${config.domain}:${config.port}/`,
    verify: `https://${config.domain}:${config.port}/api/v1/verify`,
    apiKey: config.ApiKey}
));

api.get('/api/v1/auth', steamLogin.authenticate(), function(req, res) {
  res.redirect('/');
});

api.get('/api/v1/verify', steamLogin.verify(), function(req, res) {
  res.redirect(`https://${config.siteDomain}:${config.sitePort}/`);
});

api.get('/api/v1/logout', steamLogin.enforceLogin('/'), function(req, res) {
  req.logout();
  res.redirect(`https://${config.siteDomain}:${config.sitePort}/`);
});

api.get('/api/v1/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

export default {

}