<template>
  <div :class="$style.chat">
    <div :class="$style.messages">
      <Message
        @wheel.native="scroll"
        @newChatMessage="updateScroll" v-for="(msg) of messagesToRender" :key="msg.lastMessageID"
        @putNameInInput="putNameInInput($event)"
        :username="msg.username"
        :level="msg.level"
        :rank="msg.rank"
        :avatar="msg.avatar"
        :content="msg.content"
        :date="msg.date"
        :steamid="msg.steamid"
        :emotes="emotes"
      />
    </div>
    <div :class="$style.line"></div>
    <div :class="$style.inputs" v-if="$store.state.isLoggedIn === true">
      <input
        type="text"
        placeholder="Type here..."
        v-model="inputValue"
        aria-label="message"
        @keyup.enter="sendMessage"
        ref="chatInput"
      />
      <button @click="emoteBoxState = !emoteBoxState" :class="$style.showEmotesButton">
        <i class="fas fa-flushed"></i>
      </button>
      <transition name="fade">
        <div :class="$style.emotesBox" v-if="emoteBoxState">
          <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
          <img
          @click="addEmote(i)"
          :src="emote"
          v-for="(emote, i) of emotes"
          :key="i"
          :alt="`:${emote}:`"/>
        </div>
      </transition>
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
