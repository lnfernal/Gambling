import Logo from '../views/logo/main.vue';
import GamesMenu from '../views/gamesMenu/main.vue';
import ProfileBar from '../views/profileBar/main.vue';
import InfoBar from '../views/infoBar/main.vue';
import Chat from '../views/chat/main.vue';
import Menu from '../views/menu/main.vue';
import Footer from '../views/footer/main.vue';
import EventBus from '../plugins/EventBus';

export default {
  components: {
    Logo,
    GamesMenu,
    ProfileBar,
    InfoBar,
    Chat,
    Menu,
    Footer,
  },

  data() {
    return {
      chatState: false,
    };
  },

  watch: {
    '$store.state.money': function (v) {
      this.$animNumber(this.$store.state, 'animatedMoney', v);
    },
    '$store.state.exp': function (v) {
      this.$animNumber(this.$store.state, 'animatedExp', v);
    },
  },

  mounted() {
    document.title = `${this.$config.name}`;
    this.$refs.chatContainer.style.display = 'inline-block';
    this.$script('/fa.js');
  },

  methods: {
    showChat() {
      // this.chatState = !this.chatState;
      this.$refs.chatContainer.style.display = this.$refs.chatContainer.style.display !== 'none'
        ? 'none' : 'inline-flex';
      EventBus.$emit('onChatStateChange', this.$refs.chatContainer.style.display);
    },
  },
};
