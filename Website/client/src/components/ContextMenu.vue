<template>
  <div v-if="state" :class="$style.contextMenu">
    <span @keydown="click(el.func)" :class="$style.label" v-for="(el, i) of data" :key="i"
    @click="click(el)">{{ el.name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
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
    padding: 12px 4px 12px 4px;
    background: var(--dark4NA);
    font-size: 14px;
    box-sizing: border-box;
    .label {
      padding: 8px 8px 8px 8px;
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
