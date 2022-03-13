<template>
  <div id="app" class="blue">

    <div :class="$style.logoContainer">
      <Logo />
    </div>

    <div :class="$style.gamesMenuContainer">
      <GamesMenu />
    </div>

    <div :class="$style.profileBarContainer">
      <ProfileBar />
    </div>

    <div :class="$style.chatContainer" ref="chatContainer">
      <Chat />
    </div>
    <button :class="$style.showChatButton" @click="showChat()" >C</button>

    <div :class="$style.mainContainer">
      <div :class="$style.menuContainer"></div>
      <div :class="$style.routeContainer"></div>
    </div>

    <!-- <nav>
      <router-link to="/roulette">Roulette</router-link> |
      <router-link to="/faq">FaQ</router-link>
    </nav>
    <router-view/ -->
  </div>
</template>

<style lang="scss" src="./scss/main.scss"></style>
<style module lang="scss" src="./scss/layout.scss"></style>

<script src="./js/main.js"></script>
