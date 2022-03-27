import config from './config';
import User from './user';
import Utils from './utils';
import { query } from './database';

const Game = {
  currentGameID: undefined,
  bets: {
    gray: {},
    red: {},
    blue: {},
    gold: {},
  },
  secret: undefined,
  number: undefined,
  hash: undefined,
  startTime: undefined,
};

Game.colors = [
  'gold', 'blue', 'gray', 'red', 'gray', 'red',
  'gray', 'red', 'gray', 'blue', 'gray', 'blue',
  'gray', 'red', 'gray', 'red', 'gray', 'red',
  'gray', 'blue', 'gray', 'blue', 'gray', 'red',
  'gray', 'red', 'gray', 'red', 'gray', 'red',
  'gray', 'red', 'gray', 'blue', 'gray', 'blue',
  'gray', 'red', 'gray', 'red', 'gray', 'red',
  'gray', 'blue', 'gray', 'blue', 'gray', 'red',
  'gray', 'red', 'gray', 'red', 'gray', 'blue',
];

Game.initIO = (io) => {
  Game.io = io
  start();
};

Game.initSocket = async (socket) => {
  const userData = socket.handshake.session.steamUser;
  if (userData && userData.steamid) {
    const Player = new User(userData.steamid);
    if (!(await Player.isExists())) return;


  }
};

Game.newRound = async () => {
  const secret = Utils.generateSecret();
  const number = Utils.random(0, 53);
  const hash = Utils.makeHash(secret, number);

  const result = await query('INSERT INTO `wheel` (`number`, `secret`, `hash`) VALUES (?,?,?)', [
    number, secret, hash
  ]);
  if (!result) return;

  Game.bets = {
    gray: {},
    red: {},
    blue: {},
    gold: {},
  };
  Game.currentGameID = result.insertId;
  Game.secret = secret,
  Game.number = number,
  Game.hash = hash,
  Game.startTime = Date.now(),

  Game.io.emit('wheel:newRound', {
    id: Game.currentGameID,
    hash: Game.hash,
    startTime: Game.startTime,
  });
}

// Check if there's an unsolved game that started before server crash
const start = async () => {
  const result = await query('SELECT * FROM `wheel` WHERE `isFinished`=0 ORDER BY `id` DESC LIMIT 1');
  await query('UPDATE `wheel` SET `isFinished`=1 WHERE `id`=?', [result[0].id]);
  if (result && result[0]) {
    const bets = await query('SELECT users.id, users.steamid, wheel_bets.gid, wheel_bets.color, wheel_bets.amount FROM `wheel_bets`,`users` WHERE wheel_bets.gid=? AND wheel_bets.uid=users.id', [result[0].id]);
    for (let i in bets) {
      const bet = bets[i];
      const Player = new User(bet.steamid);
      if (Game.colors[result[0].number] === bet.color) {
        await Player.changeMoney(
          bet.amount * (
            bet.color === 'gray'
              ? 2
              : bet.color === 'red'
                ? 3
                : bet.color === 'blue'
                  ? 5
                  : 50
          )
        );
      }
    }
  }
  Game.newRound();
};

export default Game;