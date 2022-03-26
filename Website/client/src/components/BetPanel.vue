<template>
  <div :class="$style.betPanelContainer">
    <div v-if="$store.state.isLoggedIn">
      <div :class="$style.balanceContainer">
        <div :class="$style.balanceIconContainer"><i class="fas fa-wallet"></i></div>
        <div :class="$style.balanceIconContainerArrow"></div>
        <div :class="$style.balance"
          v-html="money($money($store.state.animatedMoney), value)"></div>
      </div>
      <div :class="$style.counter">
        <input
          v-model="value"
          ref="betAmount"
          type="number"
          :class="$style.betAmount"
          aria-label="Bet value"
          placeholder="0.00"
          step="0.01"
        />
        <div :class="$style.controls">
          <button @click="clear"><span>Clear</span></button>
          <button @click="divide"><span>½</span></button>
          <button @click="double"><span>2x</span></button>
          <button @click="add(0.1)"><span>+0,1</span></button>
          <button @click="add(1)"><span>+1</span></button>
          <button @click="add(10)"><span>+10</span></button>
          <button @click="allIn"><span>All</span></button>
        </div>
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clear() { this.$refs.betAmount.value = '0.00'; },
    allIn() { this.$refs.betAmount.value = this.$store.state.money / 1000; },
    divide() {
      this
        .$refs.betAmount.value = Math.floor((Number(this.$refs.betAmount.value) / 2) * 1000) / 1000;
    },
    double() { this.$refs.betAmount.value *= 2; },
    add(n) {
      this.$refs.betAmount
        .value = Math.round((Number(this.$refs.betAmount.value) + n) * 1000) / 1000;
    },
    money(balance, value) {
      if (Number(this.value) > 0) {
        return value;
      }
      return balance;
    },
  },
  data() {
    return {
      value: '0.00',
    };
  },
};
</script>

<style module lang="scss">
  .balanceAfterBet {
    color: red;
  }
  .betPanelContainer {
    width: 256px + 64px + 32px;
    height: fit-content;
    padding: 8px;
    box-sizing: border-box;
    // background-color: var(--dark4);
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;

    .counter {
      width: fit-content;
      box-shadow: 0 0 8px var(--dark1NA);
    }

    .controls {
      width: 297px;
      button {
        border: 0;
        height: 40px;
        vertical-align: top;
        background-color: var(--dark3NA);
        width: fit-content;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        span {
          color: #bbb;
        }
        padding: 0 12px 0 12px;
        &:nth-child(odd) {
          padding-right: 20px;
          margin-left: -8px;
          padding-left: 18px;
        }
        &:first-child {
          margin-left: 0;
          padding-left: 12px;
        }
        &:last-child {
          padding-right: 12px;
        }
        &:nth-child(even) {
          background-color: var(--dark2NA);
          transform: skewX(-20deg);
          z-index: 1;
          margin-left: -8px;
          span {
            display: block;
            transform: skewX(20deg);
          }
        }
        transition: 0.1s background-color;
        &:hover {
          background-color: var(--defaultColor);
        }
      }
    }

    .betAmount {
      width: 280px;
      height: 40px;
      border: 0;
      outline: 0;
      background-color: var(--dark4NA);
      font-size: 16px;
      padding: 0 8px 0 8px;
      -moz-appearance: textfield;
      color: #ccc;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .balanceContainer {
      margin-bottom: 16px;
      display: flex;
      position: relative;
      width: 100%;
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
        // justify-content: center;
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
