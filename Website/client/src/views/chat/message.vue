<template>
  <div :class="$style.message">
    <div :class="$style.avatar" :style="`background-color:${rankData.rankColor}`">
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
      :style="`color:${rankData.contentColor}`" v-html="convertContent(content)">
      </div>
      <div :class='$style.hour'>
        {{ makeHour(date) }}
      </div>
      <div :class='$style.settings'>
        <button class="defaultButton small"
        @click="ContextMenuState = true">
          <span><i class="fas fa-ellipsis-h"></i></span>
        </button>
      </div>
      <ContextMenu ref="ContextMenu" :class="$style.contextMenu"
      :data="data" :state="ContextMenuState" />
    </div>
  </div>
</template>

<script>
import ContextMenu from '../../components/ContextMenu.vue';

export default {
  components: {
    ContextMenu,
  },
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
    steamid: {
      type: String,
      default: '?',
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
      ContextMenuState: false,
      data: [
        { name: 'Test 1', func: () => console.log('Test 1') },
        { name: 'Test 2', func: () => console.log('Test 2') },
        { name: 'Adam Małysz', func: () => console.log('Test 3') },
      ],
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
  methods: {
    makeHour(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hours}:${minutes}`;
    },
    convertContent(content) {
      const newContent = content
        .replace(/@[^\s^,^@]+/g, '<span class="chatPing">$&</span>')
        .replace(/(https|http):\/\/[^\s]+/g, '<a href="$&" class="chatUrl" target="_blank">$&</a>');
      return newContent;
    },
  },
};
</script>

<style module lang="scss" src="../../scss/chat.scss"></style>

<style lang="scss">
  .chatPing {
    background-color: var(--defaultColor);
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    font-weight: bold;
    box-shadow: 0 0 8px var(--defaultColor);
  }
  .chatUrl {
    text-decoration: none;
    color: #2aF;
  }
</style>
