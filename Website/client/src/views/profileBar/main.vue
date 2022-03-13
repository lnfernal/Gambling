<template>
  <div>
    <span v-if="isLoggedIn == false">
    <a :href="`${$config.api}/auth`">Zaloguj sie</a></span>
    <span v-if="isLoggedIn == true">Hej, {{ userData.username }}
    <a :href="`${$config.api}/logout`">Wyloguj sie</a></span>
    <span v-if="isLoggedIn == undefined">Ładowanie</span>
  </div>
</template>

<style module lang="scss" src="../../scss/profileBar.scss"></style>

<script src="../../js/profileBar.js"></script>
