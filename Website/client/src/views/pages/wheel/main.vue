<template>
  <div>
    <div :class="$style.topContainer">
      <div :class="$style.betPanelContainer">
        <BetPanel />
      </div>
      <div :class="$style.wheelContainer">
        <img src="@/assets/wheel.png" alt="wheel" :style="`transform: rotate(${rotation}deg)`" />
        <img src="@/assets/wheel.png" alt="wheel" :style="`transform: rotate(${rotation}deg)`" />
        <img src="@/assets/wheel.png" alt="wheel" :style="`transform: rotate(${rotation}deg)`" />
      </div>
    </div>
  </div>
</template>

<script>
import BetPanel from '../../../components/BetPanel.vue';

export default {
  components: {
    BetPanel,
  },
  data() {
    return {
      rotation: 0,
    };
  },
};
</script>

<style module lang="scss">
  .topContainer {
    width: 100%;
    display: inline-flex;
    flex-direction: row-reverse;

    .betPanelContainer {
      width: 50%;
      height: auto;
      flex-basis: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .wheelContainer {
      width: 50%;
      flex-basis: 50%;
      padding: 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      img:first-child, img:nth-child(2) {
        position: absolute;
        filter: blur(12px);
      }
      img {
        width: 256px + 128px;
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    .topContainer {
      display: flex;
      flex-direction: column-reverse;
      .betPanelContainer, .wheelContainer {
        width: 100%;
        flex-basis: 100%;
      }
    }
  }
</style>
