import Message from '../views/chat/message.vue';
import EventBus from '../plugins/EventBus';

export default {
  components: {
    Message,
  },

  data() {
    return {
      inputValue: '',
      messages: [],
      messagesToRender: [],
      lastHeight: undefined,
      lastScrollHeight: undefined,
      lastMessageID: 0,
      emotes: {
        ':sunglasses:': '/assets/emotes/1f60e.png',
        ':cash:': '/assets/emotes/1f4b5.png',
        ':clown:': '/assets/emotes/1f921.png',
        ':wave:': '/assets/emotes/1f590.png',
        ':eyeheats:': '/assets/emotes/1f60d.png',
        ':smile:': '/assets/emotes/1f604.png',
        ':heart:': '/assets/emotes/1f9e1.png',
        ':cowboy:': '/assets/emotes/1f920.png',
        ':salivate:': '/assets/emotes/1f924.png',
        ':pogpepe:': 'https://cdn.discordapp.com/attachments/466648374297493504/796476129816346634/emote.png',
        ':OMEGALUL:': '/assets/emotes/OMEGALUL.png',
        ':pepeHands:': '/assets/emotes/pepeHands.png',
        ':HYPERS:': '/assets/emotes/HYPERS.png',
        ':peepoHappy:': '/assets/emotes/peepoHappy.png',
        ':mericCat:': '/assets/emotes/mericCat.png',
        ':pepeLost:': '/assets/emotes/pepeLost.png',
        ':widepeepoHappy:': '/assets/emotes/widepeepoHappy.png',
        ':kkomrade:': '/assets/emotes/kkomrade.png',
        ':zulul:': '/assets/emotes/zulul.png',
        ':kkona:': '/assets/emotes/kkona.png',
        ':hahaa:': '/assets/emotes/haHAA.png',
        ':ez:': '/assets/emotes/ez.png',
        ':pepethink:': '/assets/emotes/pepethink.png',
        ':widehardo:': '/assets/emotes/widehardo.png',
        ':wesmart:': '/assets/emotes/wesmart.png',
      },
    };
  },
  methods: {
    putNameInInput(name) {
      this.inputValue += `@${name}, `;
      this.$refs.chatInput.focus();
    },
    updateScroll() {
      const el = this.$el.querySelector('div');
      if (this.lastHeight === this.lastScrollHeight) el.scrollTop = el.scrollHeight;
    },
    scroll() {
      const el = this.$el.querySelector('div');
      this.lastHeight = el.clientHeight;
      this.lastScrollHeight = el.scrollHeight - el.scrollTop;
    },
    createMessage(message) {
      this.lastMessageID += 1;
      const el = this.$el.querySelector('div');
      const scrollHeight = el.clientHeight;
      const totalHeight = el.scrollHeight - el.scrollTop;

      this.messages.unshift({ ...message, id: this.lastMessageID });
      this.messages = this.messages.slice(0, this.$config.chat.maxMessages);
      this.messagesToRender = [...this.messages].reverse();
      this.lastHeight = scrollHeight;
      this.lastScrollHeight = totalHeight;
    },
    showChat() {
      this.$emit('showChat');
    },
    sendMessage() {
      if (this.inputValue.length < 1) return;
      this.$socket.emit('chatMessage', this.inputValue);
      this.inputValue = '';
    },
  },
  mounted() {
    EventBus.$on('showChat', this.showChat);
    this.$socket.on('chatMessage', (data) => {
      this.createMessage(data);
    });
    // for (let i = 0; i < 12; i += 1) {
    //   this.createMessage({
    //     username: 'Pevo',
    //     level: Math.floor(Math.random() * 100),
    //     rank: Math.random() > 0.5 ? 100 : 0,
    //     avatar: 'https://avatars.akamai.steamstatic.com/0f966eafceea95ff7601fb8eee2845610462fc4d.jpg',
    //     content: '@Pevo oraz @AdamMałysz, Co tam? Zapraszam na https://google.com polecam',
    //     date: 1647432920146 / Math.random(),
    //   });
    // }
    setInterval(() => {

    }, 400);
  },
};
