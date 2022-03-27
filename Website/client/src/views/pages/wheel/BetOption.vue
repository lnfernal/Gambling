<template>
  <div :class="$style.betOption">
    <button
      :style="`
        background-image: linear-gradient(${color}, ${color});
        border: 2px solid ${color};
        box-shadow: 0 0 16px ${color};
      `"
    >
      <span>
        {{ text }}
      </span>
    </button>
    <div :class="$style.colorInfo">
      <div :class="$style.colorInfoLeft">
        <i class="fas fa-user"></i> 32
      </div>
      <div :class="$style.colorInfoRight"
        v-html="$money(43240)"
      >
      </div>
    </div>
    <div :class="$style.bets">
      <div :class="$style.bet">
        <div :class="$style.betLeft">
          <span :class="$style.betLeftLevel">
            <span>54</span>
          </span>
          Pevo
        </div>
        <div :class="$style.betRight" v-html="$money(3240)"></div>
      </div>

      <div :class="$style.bet">
        <div :class="$style.betLeft">
          <span :class="$style.betLeftLevel">
            <span>0</span>
          </span>
          Pevo
        </div>
        <div :class="$style.betRight" v-html="$money(3240)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'transparent',
    },
  },
};
</script>

<style module lang="scss">
.betOption {
  flex: 1;
  margin: 16px 16px 0 16px;
  .bets {
    width: 95%;
    margin-left: 2.5%;
    background-color: var(--dark5);
    .bet {
      width: 100%;
      display: flex;
      .betLeft, .betRight {
        display: flex;
        flex: 1;
        align-items: center;
        padding: 4px 8px 4px 8px;
        &, i {
          color: #aaa;
          font-size: 14px;
        }
      }
      .betLeft {
        .betLeftLevel {
          padding: 2px 4px 2px 4px;
          min-width: 24px;
          text-align: center;
          font-weight: bold;
          background: #888;
          margin-right: 4px;
          border-radius: 2px;
          font-size: 12px;
          span {
            display: block;
          }
        }
      }
      .betRight {
        justify-content: right;
      }
    }
  }
  .colorInfo {
    width: 95%;
    margin-left: 2.5%;
    display: flex;
    background-color: var(--dark3);
    .colorInfoLeft, .colorInfoRight {
      display: flex;
      flex: 1;
      align-items: center;
      padding: 10px 8px 8px 8px;
      font-weight: bold;
      box-sizing: border-box;
      font-size: 14px;
      &, i {
        color: #ddd;
      }
    }
    .colorInfoLeft {
      i {
        margin-right: 4px;
      }
    }
    .colorInfoRight {
      justify-content: right;
    }
  }
  button {
    cursor: pointer;
    background-color: var(--dark3);
    background-repeat: no-repeat;
    background-size: 100% 0%;
    background-position: 0 100%;
    box-sizing: border-box;
    width: 100%;
    padding: 12px 0 12px;
    font-size: 20px;
    font-weight: bold;
    transition: 0.1s background-size;
    &:hover {
      background-size: 100% 100%;
    }
  }
}
</style>
