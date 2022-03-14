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
    this.money = (await this.$api(`${this.userData.steamid}/balance`)).balance;
    if (this.userData.steamid) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  },
};
