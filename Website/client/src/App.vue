<template>
  <div id="app">
    <nav>
      <router-link to="/roulette">Roulette</router-link> |
      <router-link to="/faq">FaQ</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss" src="./scss/main.scss"></style>

<script src="./js/main.js"></script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
