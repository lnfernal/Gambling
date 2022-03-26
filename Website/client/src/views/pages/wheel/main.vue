<template>
  <div>
    <div :class="$style.topContainer">
      <div :class="$style.betPanelContainer">
        <BetPanel />
      </div>
      <div :class="$style.wheelContainer" @click="roll(1, 0)" @keyup="roll">
        <img src="@/assets/wheel.png" alt="wheel"
        :style="`transform: rotate(${rotation + 90 - 360 / 54 * 0.5}deg)`" />
        <img src="@/assets/wheel.png" alt="wheel"
        :style="`transform: rotate(${rotation + 90 - 360 / 54 * 0.5}deg)`" />
        <img src="@/assets/wheel.png" alt="wheel"
        :style="`transform: rotate(${rotation + 90 - 360 / 54 * 0.5}deg)`" />
        <i class="fas fa-location-arrow"
        :style="`
          color: ${colors[translatedColors[(
          Math.round((((rotation % 360)) / 360) * 54)
          ) % 54]]};
          text-shadow: 0 0 12px ${colors[translatedColors[(
          Math.round((((rotation % 360)) / 360) * 54)
          ) % 54]]};
        `"
        ></i>
        <div :class="$style.gameHash">
          Round ID: 542343<br />
          Hash: 282ce90a0f721b09507335a443e65f343e1e447971fe7ee0f2bae3db02092277
        </div>
        <span ref="gameInfoText" :class="$style.gameInfo"></span>
        <div :class="$style.gameHistory">
          <div :class="$style.gameHistoryDraw"
            :style="`
            background-color: ${colors.gold};
            box-shadow: 0 0 6px ${colors.gold};
            `"
          ></div>
          <div :class="$style.gameHistoryDraw"
            :style="`
            background-color: ${colors.red};
            box-shadow: 0 0 6px ${colors.red};
            `"
          ></div>
          <div :class="$style.gameHistoryDraw"
            :style="`
            background-color: ${colors.red};
            box-shadow: 0 0 6px ${colors.red};
            `"
          ></div>
        </div>
      </div>
    </div>
    <div :class="$style.bottomContainer">

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
      rotation: 0, // (53.51 / 54) * 360,
      interval: undefined,
      timeout: undefined,
      translatedColors: [
        'gold', 'blue', 'gray', 'red', 'gray', 'red',
        'gray', 'red', 'gray', 'blue', 'gray', 'blue',
        'gray', 'red', 'gray', 'red', 'gray', 'red',
        'gray', 'blue', 'gray', 'blue', 'gray', 'red',
        'gray', 'red', 'gray', 'red', 'gray', 'red',
        'gray', 'red', 'gray', 'blue', 'gray', 'blue',
        'gray', 'red', 'gray', 'red', 'gray', 'red',
        'gray', 'blue', 'gray', 'blue', 'gray', 'red',
        'gray', 'red', 'gray', 'red', 'gray', 'blue',
      ],
      colors: {
        gold: '#feca57',
        blue: '#45aaf2',
        red: '#b71540',
        gray: '#3d3d3d',
      },
    };
  },
  methods: {
    roll(number, offset = 0, time = 8000) {
      this.$refs.gameInfoText.innerHTML = 'Rolling...';
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
      }
      const rollStartTime = Date.now();
      this.interval = setInterval(() => {
        const progress = this.$easing.easeOutCubic((Date.now() - rollStartTime) / time);
        this.rotation = number * (360 / 54 + (360 / 54) * offset)
          * progress
          + (360 * 5) * progress;
      }, 1000 / 60);
      this.timeout = setTimeout(() => {
        clearInterval(this.interval);
        clearTimeout(this.timeout);
        this.interval = undefined;
        this.timeout = undefined;
        this.$refs.gameInfoText.innerHTML = `
        Rolled <span style="color: ${this.colors[this.translatedColors[(
    Math.round((((this.rotation % 360)) / 360) * 54)
  ) % 54]]};
    text-shadow: 0 0 8px ${this.colors[this.translatedColors[(
    Math.round((((this.rotation % 360)) / 360) * 54)
  ) % 54]]};
  ">${this.translatedColors[number]}</span>
        `;
      }, time);
    },
  },
};
</script>

<style module lang="scss">
  .bottomContainer {
    width: 100%;
    box-sizing: border-box;
  }
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
      .gameHistory {
        position: absolute;
        right: 0;
        height: 100%;
        width: 28px;
        display: flex;
        flex-direction: column;
        justify-content: end;
        .gameHistoryDraw {
          width: 100%;
          height: 4px;
          margin-top: 6px;
          border-radius: 2px;
        }
      }
      .gameHash {
        position: absolute;
        font-size: 10px;
        white-space: nowrap;
        color: #444;
        top: 16px;
      }
      .gameInfo {
        position: absolute;
        font-weight: bold;
        font-size: 22px;
        color: #ccc;
        margin-top: 32px;
      }
      i {
        position: absolute;
        bottom: 32px;
        transform: rotate(90deg + 45deg);
        font-size: 28px;
      }
      width: 50%;
      flex-basis: 50%;
      padding: 32px 32px 0 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 32px;
      img:nth-child(1), img:nth-child(2) {
        position: absolute;
        filter: blur(12px);
      }
      img {
        width: 256px + 128px;
        margin-top: 32px;
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    .topContainer {
      display: flex;
      flex-direction: column-reverse;
      .betPanelContainer, .wheelContainer {
        width: 100%;
        flex-basis: 100%;
      }
      .wheelContainer {
        .gameHistory {
          right: 64px;
        }
      }
    }
  }
</style>
