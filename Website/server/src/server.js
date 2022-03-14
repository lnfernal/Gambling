import config from './config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import SocketIO from 'socket.io';
import subdomain from 'express-subdomain';
import expressSession from 'express-session';
import sharedSession from 'express-socket.io-session';
import cors from 'cors';

const app = express();

const api = express.Router();
app.use(subdomain('api', api));

const session = expressSession({ resave: false, saveUninitialized: false, secret: config.secret });
app.use(session);
app.use(cors({
  origin: `https://${config.siteDomain}:${config.sitePort}`,
  credentials: true,
}));

const server = https.createServer({
  key: fs.readFileSync(config.certificatePath.socket.key),
  cert: fs.readFileSync(config.certificatePath.socket.cert),
}, app);
server.addContext(`api.${config.domain}`, {
  key: fs.readFileSync(config.certificatePath.api.key),
  cert: fs.readFileSync(config.certificatePath.api.cert),
});

const io = new SocketIO.Server(server);
io.use(sharedSession(session, {
  autoSave: true,
}));

server.listen(config.port, ()  => {
  console.log(`Server is running on ${config.port}`);
});

export default {
  io, app, api, session,
};