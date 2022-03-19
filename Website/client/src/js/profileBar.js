import ContextMenu from '../components/ContextMenu.vue';

export default {
  components: {
    ContextMenu,
  },
  data() {
    return {
      isLoggedIn: undefined,
      userData: undefined,
      money: 0,
      animatedMoney: 0,
      data: [
        { name: 'Profile', func: this.goToProfile },
        { name: '<span style="color: #F44">Logout</span>', func: this.logout },
      ],
    };
  },
  watch: {
    money(v) {
      this.$animNumber(this, 'animatedMoney', v);
    },
  },
  methods: {
    logout() {
      window.location.href = `${this.$config.api}/logout`;
    },
    goToProfile() {
      this.$router.history.replace('/profile');
    },
  },
  async mounted() {
    this.userData = await this.$api('user');
    if (this.userData.steamid) {
      this.isLoggedIn = true;
      this.money = (await this.$api(`${this.userData.steamid}/balance`)).balance;
      this.$store.state.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.$store.state.isLoggedIn = false;
    }
  },
};
