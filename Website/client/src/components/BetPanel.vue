<template>
  <div :class="$style.betPanelContainer">
    <div :class="$style.balanceContainer">
      <div :class="$style.balanceIconContainer"><i class="fas fa-wallet"></i></div>
      <div :class="$style.balanceIconContainerArrow"></div>
      <div :class="$style.balance" v-html="$money($store.state.animatedMoney)"></div>
    </div>
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

    .balanceContainer {
      display: flex;
      position: relative;
      .balanceIconContainer {
        background-color: var(--defaultColor);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        i {
          color: #ddd;
        }
      }
      .balanceIconContainerArrow {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border: 20px solid transparent;
        border-left-color: var(--defaultColor);
        position: absolute;
        left: 40px;
      }
      .balance {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--dark6);
        padding: 0 16px 0 32px;
        font-weight: bold;
        &, i {
          color: var(--defaultColor);
          text-shadow: 2px 2px 0 var(--dark1);
        }
      }
    }
  }
</style>
