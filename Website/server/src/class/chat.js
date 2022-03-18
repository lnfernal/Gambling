import config from './config';
import User from './user';

const Chat = {};

Chat.Messages = [];

Chat.initIO = (io) => {
  Chat.io = io;
};

Chat.initSocket = (socket) => {
  const user = socket.handshake.session.steamUser;

  for (let i in Chat.Messages) {
    socket.emit('chatMessage', Chat.Messages[i]);
  }

  if (user && user.steamid) {
    const steamid = user.steamid;
    socket.on('chatMessage', async (data) => {
      const sender = new User(steamid);
      if (!(await sender.isExists())) return;
      if (!(await sender.getPermission('chat.send'))) return;

      let content = data;

      if (Chat.Messages.length >= config.chat.maxMessages) Chat.Messages.splice(0, 1);

      const senderInfo = await sender.get(['username', 'rank', 'avatar', 'exp']);
      const Message = {
        steamid: steamid,
        username: senderInfo.username,
        avatar: sender.makeAvatar(senderInfo.avatar, 1),
        level: sender.makeLevel(senderInfo.exp),
        content: content,
        rank: senderInfo.rank,
        date: Date.now(),
      };

      Chat.Messages.push(Message);

      Chat.io.emit('chatMessage', Message);
    });
  }
};

export default Chat;