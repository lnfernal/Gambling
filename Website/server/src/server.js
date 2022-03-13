import config from './config';
import express from 'express';
import https from 'https';
import fs from 'fs';
import SocketIO from 'socket.io';
import subdomain from 'express-subdomain';

const app = express();

const server = https.createServer({
  key: fs.readFileSync(config.certificatePath.socket.key),
  cert: fs.readFileSync(config.certificatePath.socket.cert),
}, app);
server.addContext('api.steam.pevo.xyz', {
  key: fs.readFileSync(config.certificatePath.api.key),
  cert: fs.readFileSync(config.certificatePath.api.cert),
});

const io = new SocketIO.Server(server);

const api = express.Router();
api.get('/', (req, res) => {res.send('123')})
app.use(subdomain('api', api));

server.listen(config.port, ()  => {
  console.log(`Server is running on ${config.port}`);
});

export default {
  io, app, api
}