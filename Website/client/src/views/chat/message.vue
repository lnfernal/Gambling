<template>
  <div :class="$style.message">
    <div :class="$style.avatar">
      <img :src="avatar" alt="avatar" />
    </div>
    <div :class="$style.content">
      <div :class="$style.usernamebar">
        <span :class="$style.rank" :style="`background-color:${'#0000ff'}`">
          <span>Admin</span>
        </span>
        <span :class="$style.username" :style="`background-color:${'#202020'}`">
          <span>{{ username }}</span>
        </span>
      </div>
      {{ content }}
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
  },
  data() {
    return {};
  },
};
</script>

<style module lang="scss" src="../../scss/chat.scss"></style>
