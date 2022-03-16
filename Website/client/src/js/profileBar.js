export default {
  data() {
    return {
      isLoggedIn: undefined,
      userData: undefined,
      money: 0,
    };
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
