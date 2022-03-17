<template>
  <div class="menu">
    <div class="leftMenu">
      <button class="showChatButton" @click="showChat" >
        <i class="fas fa-angle-double-left" ref="showChatButtonI"></i>
      </button>
      <nav>
        <router-link to="/free">
          <span><i class="fas fa-coins"></i> Free coins</span>
        </router-link>
        <router-link to="/affiliates">
          <span><i class="fas fa-users"></i> Affiliates</span>
        </router-link>
      </nav>
    </div>

    <div class="rightMenu">
      <nav>
        <router-link to="/deposit">
          <span><i class="fas fa-coins"></i> Deposit</span>
        </router-link>
        <router-link to="/withdraw">
          <span><i class="fas fa-users"></i> Withdraw</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss" src="../../scss/menu.scss"></style>

<script>
import EventBus from '../../plugins/EventBus';

export default {
  mounted() {
    EventBus.$on('onChatStateChange', (e) => {
      this.$refs.showChatButtonI.classList = e === 'none'
        ? 'fas fa-angle-double-right'
        : 'fas fa-angle-double-left';
    });
  },
  methods: {
    showChat() {
      EventBus.$emit('showChat');
    },
  },
};
</script>
