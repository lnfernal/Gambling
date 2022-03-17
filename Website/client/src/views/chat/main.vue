<template>
  <div :class="$style.chat">
    <div :class="$style.messages">
      <Message
        @wheel.native="scroll"
        @newChatMessage="updateScroll" v-for="(msg) of messagesToRender" :key="msg.lastMessageID"
        :username="msg.username"
        :level="msg.level"
        :rank="msg.rank"
        :avatar="msg.avatar"
        :content="msg.content"
        :date="msg.date"
      />
    </div>
    <div :class="$style.line"></div>
    <div :class="$style.inputs" v-if="$store.state.isLoggedIn === true">
      <input type="text" placeholder="Type here..." v-model="inputValue" aria-label="message" />
      <button :class="$style.showEmotesButton"><i class="fas fa-flushed"></i></button>
    </div>
    <div :class="`${$style.inputs} ${$style.notLoggedIn}`"
      v-else-if="$store.state.isLoggedIn === false">
      <a :href="`${$config.api}/auth`">
        <button class="defaultButton small"><span><i class="fa fa-steam"></i>Sign in</span></button>
      </a>
       to join chat
    </div>
    <div :class="$style.inputs" v-else></div>
  </div>
</template>

<style module lang="scss" src="../../scss/chat.scss"></style>

<script src="../../js/chat.js"></script>
