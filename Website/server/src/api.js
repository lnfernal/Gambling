import server from './server';
import query from './database';
import config from './config';
import steamLogin from 'steam-login';
import User from './user';

const api = server.app;

const ERROR_CODES = {
  0: 'Not logged in',
  1: 'Not permitted',
};
const throwError = (res, code) => {
  res.json({
    error: true,
    code: code,
    message: ERROR_CODES[code],
  });
}

api.use(steamLogin.middleware({
    realm: `https://${config.domain}:${config.port}/`,
    verify: `https://${config.domain}:${config.port}/api/v1/verify`,
    apiKey: config.ApiKey}
));

api.get('/api/v1/auth', steamLogin.authenticate(), function(req, res) {
  res.redirect('/');
});

api.get('/api/v1/verify', steamLogin.verify(), async function(req, res) {
  if (!req.user) {
    res.redirect(`https://${config.siteDomain}:${config.sitePort}/`);
    return;
  }
  const user = new User(req.user.steamid);
  await user.auth(req.user, req.ip);
  res.redirect(`https://${config.siteDomain}:${config.sitePort}/`);
});

api.get('/api/v1/logout', steamLogin.enforceLogin(`https://${config.siteDomain}:${config.sitePort}/`), function(req, res) {
  if (!req.user) {
    res.redirect(`https://${config.siteDomain}:${config.sitePort}/`);
    return;
  }
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

api.get('/api/v1/:user/balance', async (req, res) => {
  if (!req.user) {
    throwError(res, 0);
    return;
  }
  const requestingUser = new User(req.user.steamid);
  if (String(req.params.user) === String(req.user.steamid)) {
    res.json({
      success: true,
      balance: await requestingUser.get('money'),
    });
  } else if (await requestingUser.getPermission('balance.*')) {
    const targetUser = new User(req.params.user);
    res.json({
      success: true,
      balance: await targetUser.get('money'),
    });
  } else {
    throwError(res, 1);
    return;
  }
});

export default {

}