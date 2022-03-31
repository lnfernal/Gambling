<template>
  <div>
    <div :class="$style.topContainer">
      <div :class="$style.betPanelContainer">
        <div :class="$style.gameHistory">
          <div
            :class="$style.gameHistoryDraw"
            v-for="draw of gameHistory"
            :key="draw.id"
            :style="`
            background-color: ${colors[draw.color]};
            box-shadow: 0 0 6px ${colors[draw.color]};
            `"
          ></div>
        </div>
        <BetPanel />
      </div>
      <div :class="$style.wheelContainer" @click="roll(0, 0)" @keyup="roll">
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
          Round ID: {{ roundID }}<br />
          Hash: {{ hash }}
        </div>
        <span ref="gameInfoText" :class="$style.gameInfo"></span>
      </div>
    </div>
    <div :class="$style.bottomContainer">
      <BetOption
        text="2x"
        :color="colors.gray"
        :users="grayBets.length"
        :cash="grayCash"
        :bets="grayBets"
      />
      <BetOption
        text="3x"
        :color="colors.red"
        :users="redBets.length"
        :cash="redCash"
        :bets="redBets"
      />
      <BetOption
        text="5x"
        :color="colors.blue"
        :users="blueBets.length"
        :cash="blueCash"
        :bets="blueBets"
      />
      <BetOption
        text="50x"
        :color="colors.gold"
        :users="goldBets.length"
        :cash="goldCash"
        :bets="goldBets"
      />
    </div>
  </div>
</template>

<script>
import BetPanel from '../../../components/BetPanel.vue';
import BetOption from './BetOption.vue';

export default {
  components: {
    BetPanel,
    BetOption,
  },
  data() {
    return {
      grayCash: 10,
      redCash: 123220,
      blueCash: 100023000,
      goldCash: 1,
      grayBets: [],
      redBets: [],
      blueBets: [
        {
          username: 'Pevo',
          level: 421,
          money: 1500,
        },
        {
          username: 'Abc',
          level: 5,
          money: 500,
        },
        {
          username: 'Cba',
          level: 0,
          money: 23459,
        },
      ],
      goldBets: [],
      gameHistory: [
        {
          id: 323,
          hash: 'cejcfeuiorfrjeo',
          color: 'blue',
        },
        {
          id: 22,
          hash: 'cejcfeuiorfrjeo',
          color: 'red',
        },
        {
          id: 13,
          hash: 'cejcfeuiorfrjeo',
          color: 'blue',
        },
        {
          id: 35323,
          hash: 'cejcfeuiorfrjeo',
          color: 'gray',
        },
      ],
      roundID: '542343',
      hash: '282ce90a0f721b09507335a443e65f343e1e447971fe7ee0f2bae3db02092277',
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
    display: inline-flex;
    padding: 0 8px 0 8px;
    margin-top: 32px;
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
      position: relative;
      padding-bottom: 72px;

      .gameHistory {
        position: absolute;
        bottom: 32px;
        height: 24px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        .gameHistoryDraw {
          width: 5px;
          height: 100%;
          margin: 0 2px 0 2px;
          border-radius: 2px;
        }
      }
    }
    .wheelContainer {
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
        max-width: 100%;
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
    .bottomContainer {
      display: flex;
      flex-direction: column;
      padding: 0 8px 0 8px;
    }
  }
</style>
