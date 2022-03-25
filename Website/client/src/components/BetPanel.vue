<template>
  <div :class="$style.betPanelContainer">
    <input type="number" v-model="value" aria-label="Bet value" />
    <div :class="$style.inputAddon"></div><div :class="$style.buttonAddon"></div>
    <button v-html="`Balance: ${$money($store.state.animatedMoney)}`"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
};
</script>

<style module lang="scss">
  .betPanelContainer {
    width: fit-content;
    height: fit-content;
    padding: 8px;
    box-sizing: border-box;
    background-color: var(--dark3NA);
    display: flex;
    position: relative;
    .inputAddon, .buttonAddon {
      position: absolute;
      height: 37px;
      transform: skewX(-20deg);
    }
    .inputAddon {
      left: 128px + 16px;
      width: 16px;
      background-color: var(--dark5NA);
    }
    .buttonAddon {
      left: 128px + 16px + 16px;
      width: 16px;
      background-color: var(--defaultColor);
    }
    button {
      background-color: var(--defaultColor);
      outline: 0;
      border: 0;
      font-size: 16px;
      width: 128px + 64px;
      z-index: 1;
      padding-right: 12px;
    }
    input {
      z-index: 1;
      outline: 0;
      border: 0;
      box-sizing: border-box;
      padding: 8px;
      font-size: 16px;
      width: 128px + 16px;
      background-color: var(--dark5NA);
      margin-right: 16px;
    }
  }
</style>
