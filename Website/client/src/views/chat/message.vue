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
        <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
          <span :style="`color:${rankData.usernameTextColor}`"
          @click="putNameInInput()">
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
        @click="$refs.ContextMenu.show()">
          <span><i class="fas fa-ellipsis-h"></i></span>
        </button>
      </div>
      <ContextMenu ref="ContextMenu" :class="$style.contextMenu"
      :data="data" />
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
      default: '0',
    },
    emotes: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    rank() {
      if (typeof this.$store.state.ranks[this.rank] !== 'undefined') {
        this.rankData = this.$store.state.ranks[this.rank]
          ? this.$store.state.ranks[this.rank]
          : this.$store.state.ranks[0];
      } else {
        this.rankData = { ...this.$store.state.ranks[0] };
      }
    },
  },
  data() {
    return {
      rankData: undefined,
      ContextMenuState: false,
      data: [
        { name: 'Profile', func: this.goToProfile },
      ],
    };
  },
  mounted() {
    this.$emit('newChatMessage');
  },
  created() {
    if (typeof this.$store.state.ranks[this.rank] !== 'undefined') {
      this.rankData = this.$store.state.ranks[this.rank]
        ? this.$store.state.ranks[this.rank]
        : this.$store.state.ranks[0];
    } else {
      this.rankData = { ...this.$store.state.ranks[0] };
    }
  },
  methods: {
    goToProfile() {
      console.log(this.steamid);
      this.$router.history.replace(`/profile/${this.steamid}`);
    },
    putNameInInput() {
      this.$emit('putNameInInput', this.username);
    },
    makeHour(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      return `${hours}:${minutes}`;
    },
    convertContent(content) {
      let newContent = content
        .replace(/@[^\s^,^@]+/g, '<span class="chatPing">$&</span>')
        .replace(/(https|http):\/\/[^\s]+/g, '<a href="$&" class="chatUrl" target="_blank">$&</a>');

      Object.keys(this.emotes).forEach((key) => {
        newContent = newContent.replace(key, `<img src="${this.emotes[key]}"alt="emote" title="${key}">`);
      });
      return newContent;
    },
  },
};
</script>

<style module lang="scss" src="../../scss/chat.scss"></style>

<style lang="scss">
  .chatPing {
    background-color: var(--dark5NA);
    padding: 2px 4px 2px 4px;
    border-radius: 4px;
    font-weight: bold;
    box-shadow: 0 0 8px var(--dark1);
  }
  .chatUrl {
    text-decoration: none;
    color: #2aF;
  }
</style>
