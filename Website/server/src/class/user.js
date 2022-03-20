import { query } from './database';

const defaultPermissions = [
  'balance.self',
  'bet.roulette',
  'chat.send',
  'chat.emote',
  'deposit',
  'withdraw',
];

const ranks = {
  '-1': {
    name: 'Banned',
    permissions: [
      'balance.self',
    ],
  },
  0: {
    name: 'User',
    permissions: [
      ...defaultPermissions,
    ],
  },
  96: {
    name: 'YouTube',
    permissions: [
      ...defaultPermissions,
    ],
  },
  97: {
    name: 'Support',
    permissions: [
      ...defaultPermissions,
    ],
  },
  98: {
    name: 'Mod',
    permissions: [
      ...defaultPermissions,
    ],
  },
  99: {
    name: 'Admin',
    permissions: [
      '*'
    ],
  },
  100: {
    name: 'Owner',
    permissions: [
      '*'
    ],
  }
};

export default class User {
  constructor(steamid) {
    this.steamid = steamid;
    this.isLoaded = false;
  }
  async isExists() {
    const result = await query('SELECT `steamid` FROM `users` WHERE `steamid`=?', [this.steamid]);
    return result[0] ? true : false;
  }
  async get(values) {
    if (typeof values === 'string') {
      const result = await query(`SELECT \`${values}\` FROM \`users\` WHERE \`steamid\`=?`, [this.steamid]);
      return (result && result[0] && typeof result[0][values] !== 'undefined') ? result[0][values] : false;
    } else {
      let valuesToSelect = `\`${values[0]}\``;
      for (let i in values) {
        if (i > 0) {
          valuesToSelect += `,\`${values[i]}\``;
        }
      }
      const result = await query(`SELECT ${valuesToSelect} FROM \`users\` WHERE \`steamid\`=?`, [this.steamid]);
      return (result && result[0]) ? result[0] : false;
    }
  }
  makeLevel(exp) {
    return Math.floor((exp + 1000) / 11000);
  }
  async getLevel() {
    const exp = await this.get('exp');
    return Math.floor((exp + 1000) / 11000);
  }
  async getPermission(permission) {
    if (await this.isExists()) {
      const rank = await this.get('rank');
      if (!ranks[rank]) return false;
      const permissions = ranks[rank].permissions;
      for (let i in permissions) {
        if (permission == permissions[i] || permissions[i] == '*') {
          return true
        }
      }
    } else {
      return false;
    }
  }
  makeAvatar(avatarString, size = 2) {
    return `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/${avatarString}${size == 1 ? '' : size == 2 ? '_medium' : '_full'}.jpg`;
  }
  async getAvatar(size = 2) {
    const avatarString = await this.get('avatar');
    if (!avatarString) return false;
    return `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/${avatarString}${size == 1 ? '' : size == 2 ? '_medium' : '_full'}.jpg`;
  }
  async auth(data, ip) {
    if (await this.isExists()) {
      await query('UPDATE `users` SET `username`=?, avatar=? WHERE `steamid`=?',
      [
        data.username,
        data.avatar.large
        .replace('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/', '')
        .replace('_full.jpg', ''),
        data.steamid,
      ]);
    } else {
      await query('INSERT INTO `users` (`steamid`, `username`, `avatar`, `steamcreated`, `country`) VALUES (?,?,?,?,?)',
      [
        data.steamid,
        data.username,
        data.avatar.large
        .replace('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/', '')
        .replace('_full.jpg', ''),
        new Date(data._json.timecreated * 1000),
        data._json.loccountrycode,
      ]);
    }
    const userData = (await query('SELECT `id` FROM `users` WHERE `steamid`=?', [data.steamid]))[0];
    await query('INSERT INTO `authlogs` (`userid`, `ip`) VALUES (?,?)',
    [
      userData.id,
      ip,
    ]);
    return true;
  }
};