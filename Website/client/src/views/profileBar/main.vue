<template>
  <div :class="$style.profileBar">
    <div v-if="isLoggedIn === false" :class="$style.profileBarSignInBox">
      <a :href="`${$config.api}/auth`">
        <button class="defaultButton medium green">
          <span><i class="fab fa-steam"></i> Sign in</span>
        </button>
      </a>
    </div>
    <div v-if="isLoggedIn === true" :class="$style.profileBarUser">
      <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
      <div :class="$style.avatarBox" @click="$refs.ContextMenu.show()">
        <div :class="$style.avatar">
          <img :src="userData.avatar.medium" alt="Avatar" />
        </div>
        <div :class="$style.profileSettings">
          <i class="fas fa-bars"></i>
        </div>
        <ContextMenu ref="ContextMenu" :class="$style.contextMenu"
        :data="data" />
      </div>
      <div :class="$style.userDataBox">
        <div :class="$style.moneyContainer">
          <span :class="$style.money">
            <span v-html="$money($store.state.animatedMoney)"></span>
          </span>
        </div>
        <div :class="$style.levelContainer">
          <div :class="$style.level">
            <span>{{ $level($store.state.exp) }}</span>
          </div>
          <div :class="$style.expBar"
          :style="`background-size: ${$getLevelProgress($store.state.exp) * 100}%`">
            <span>
              {{ Math.floor($getLevelProgress($store.state.exp) * 100000) / 1000 }}%
            </span>
          </div>
          <div :class="$style.level2">
            <span>{{ $level($store.state.exp) + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoggedIn === undefined">Loading...</div>
  </div>
</template>

<style module lang="scss" src="../../scss/profileBar.scss"></style>

<script src="../../js/profileBar.js"></script>
