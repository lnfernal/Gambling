<template>
  <div :class="$style.message">
    <div :class="$style.avatar">
      <img :src="avatar" alt="avatar" />
    </div>
    <div :class="$style.content">
      <div :class="$style.usernamebar">
        <span :class="$style.rank"
        :style="`background-color:${rankData.rankColor}`">
          <span :style="`color:${rankData.rankTextColor}`">
          {{ rankData.showRankInChat ? rankData.name : level }}</span>
        </span>
        <span :class="$style.username"
        :style="`background-color:${rankData.usernameColor}`">
          <span :style="`color:${rankData.usernameTextColor}`">
          {{ username }}</span>
        </span>
      </div>
      <div :class="$style.contentText"
      :style="`color:${rankData.contentColor}`">
        {{ content }}
      </div>
      <div :class='$style.hour'>
        {{ makeHour(date) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: '???',
    },
    level: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default: '../../assets/user.png',
    },
    content: {
      type: String,
      default: '???',
    },
    date: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    rank() {
      this.rankData = typeof this.$store.state.ranks[this.rank] !== 'undefined'
        ? this.$store.state.ranks[this.rank]
        : this.$store.state.ranks[0];
    },
  },
  data() {
    return {
      rankData: undefined,
    };
  },
  mounted() {
    this.$emit('newChatMessage');
  },
  created() {
    this.rankData = typeof this.$store.state.ranks[this.rank] !== 'undefined'
      ? this.$store.state.ranks[this.rank]
      : this.$store.state.ranks[0];
  },
  unmounted() {
    console.log(123);
    this.rankData = undefined;
  },

  methods: {
    makeHour(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style module lang="scss" src="../../scss/chat.scss"></style>
