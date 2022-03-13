export default {
  data() {
    return {
      isLoggedIn: undefined,
      userData: undefined,
      logoutUrl: `${this.$config.api}/logout`,
    };
  },
  async mounted() {
    this.userData = await this.$api('user');
    if (this.userData.steamid) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
};
