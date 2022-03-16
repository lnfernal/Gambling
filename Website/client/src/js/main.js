import Logo from '../views/logo/main.vue';
import GamesMenu from '../views/gamesMenu/main.vue';
import ProfileBar from '../views/profileBar/main.vue';
import InfoBar from '../views/infoBar/main.vue';
import Chat from '../views/chat/main.vue';
import Menu from '../views/menu/main.vue';
import Footer from '../views/footer/main.vue';

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

  mounted() {
    document.title = `${this.$config.name}`;
    this.$script('fa.js');
  },

  methods: {
    showChat() {
      this.chatState = !this.chatState;
      this.$refs.chatContainer.style.display = this.chatState ? 'inline-flex' : 'none';
    },
  },
};
