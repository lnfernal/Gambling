export default {
  data() {
    return {
      chatState: false,
    };
  },

  methods: {
    showChat() {
      this.chatState = !this.chatState;
      console.log(this.$refs.chatContainer);
    },
  },
};
