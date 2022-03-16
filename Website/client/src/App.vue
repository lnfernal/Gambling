<template>
  <div id="app" class="green">

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
      <InfoBar />
      <Chat @showChat="showChat"/>
    </div>

    <div :class="$style.mainContainer" ref="mainContainer">
      <div :class="$style.menuContainer">
        <Menu />
      </div>
      <div :class="$style.routeContainer">
        <router-view />
      </div>
    </div>

    <!-- <nav>
      <router-link to="/roulette">Roulette</router-link> |
      <router-link to="/faq">FaQ</router-link>
    </nav>
    <router-view /> -->
  </div>
</template>

<style lang="scss" src="./scss/main.scss"></style>
<style module lang="scss" src="./scss/layout.scss"></style>

<script src="./js/main.js"></script>
