<template>
  <div :class="$style.chat">
    <div :class="$style.messages">
      <Message
        username="Pevo"
        :level="3"
        :rank="0"
        avatar="https://avatars.akamai.steamstatic.com/0f966eafceea95ff7601fb8eee2845610462fc4d.jpg"
        content="Elo hej cześć"
      />
      <Message
        username="Pevo"
        :level="3"
        :rank="0"
        avatar="https://avatars.akamai.steamstatic.com/0f966eafceea95ff7601fb8eee2845610462fc4d.jpg"
        content="Elo hej cześć. Tu znajduje się bardzo długa wiadomość,
        której nie jesteś w stanie przeczytać"
      />
      <Message
        username="Pevo"
        :level="3"
        :rank="0"
        avatar="https://avatars.akamai.steamstatic.com/0f966eafceea95ff7601fb8eee2845610462fc4d.jpg"
        content="Elo hej cześć"
      />
    </div>
    <div :class="$style.inputs" v-if="$store.state.isLoggedIn === true">
      <input type="text" placeholder="Type here..." v-model="inputValue" aria-label="message" />
      <button :class="$style.showEmotesButton"><i class="fas fa-flushed"></i></button>
    </div>
    <div :class="`${$style.inputs} ${$style.notLoggedIn}`"
      v-else-if="$store.state.isLoggedIn === false">
      <a :href="`${$config.api}/auth`">
        <button class="defaultButton small"><span><i class="fa fa-steam"></i>Sign in</span></button>
      </a>
       to send message
    </div>
    <div :class="$style.inputs" v-else></div>
  </div>
</template>

<style module lang="scss" src="../../scss/chat.scss"></style>

<script src="../../js/chat.js"></script>
