import ContextMenu from '../components/ContextMenu.vue';

export default {
  components: {
    ContextMenu,
  },
  data() {
    return {
      userData: undefined,
      isLoggedIn: undefined,
      data: [
        { name: 'Profile', func: this.goToProfile },
        { name: '<span style="color: #F44">Logout</span>', func: this.logout },
      ],
    };
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
    this.$store.state.exp = (await this.$api(`${this.userData.steamid}/exp`)).exp;
    if (this.userData.steamid) {
      this.isLoggedIn = true;
      this.$store.state.money = (await this.$api(`${this.userData.steamid}/balance`)).balance;
      this.$store.state.isLoggedIn = true;
      this.$store.state.userData = this.userData;
    } else {
      this.isLoggedIn = false;
      this.$store.state.isLoggedIn = false;
    }
  },
};
