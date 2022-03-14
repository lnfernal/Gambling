<template>
  <div :class="$style.profileBar">
    <div v-if="isLoggedIn == false" :class="$style.profileBarSignInBox">
      <a :href="`${$config.api}/auth`">
        <button class="defaultButton medium green">
          <span><i class="fab fa-steam"></i> Sign in</span>
        </button>
      </a>
    </div>
    <div v-if="isLoggedIn == true" :class="$style.profileBarUser">
      <img :src="userData.avatar.small" alt="Avatar" /> Hej, {{ userData.username }},
       masz {{ money }}
      <a :href="`${$config.api}/logout`">Logout</a>
    </div>
    <div v-if="isLoggedIn == undefined">Ładowanie</div>
  </div>
</template>

<style module lang="scss" src="../../scss/profileBar.scss"></style>

<script src="../../js/profileBar.js"></script>
