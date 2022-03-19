<template>
  <transition name="fade">
    <div v-if="state" :class="$style.contextMenu">
      <span @keydown="click(el.func)" :class="$style.label" v-for="(el, i) of data" :key="i"
      @click="click(el)" v-html="el.name"></span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      state: false,
    };
  },
  mounted() {
    document.addEventListener('mouseup', this.clickHandler);
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.clickHandler);
  },
  methods: {
    clickHandler() {
      this.state = false;
    },
    show() {
      this.state = true;
    },
    click(el) {
      el.func(el.args);
    },
  },
  watch: {
    state() {
      console.log(this.state);
    },
  },
};
</script>

<style module lang="scss">
  .contextMenu {
    border-radius: 4px;
    z-index: 10;
    position: absolute;
    padding: 4px 4px 4px 4px;
    background: var(--dark4NA);
    font-size: 14px;
    box-sizing: border-box;
    .label {
      padding: 8px 16px 8px 16px;
      display: block;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.1s background-color;
      border-radius: 4px;
      &:hover {
        background-color: var(--dark2);
      }
    }
  }
</style>

<style scoped lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
