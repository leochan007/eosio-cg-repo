<template>
  <div :class="className">
    <div>
      <div v-if="status === 1" class="result win">VICTORY</div>
      <div v-else class="result lost">DEFEATED</div>
      <div class="player">
        <div class="round-result" v-html="playerRoundResult"></div>
        <Card :cardId="playerCard"/>
        <p class="name">{{ playerName }}</p>
      </div>
      <div class="vs">VS</div>
      <div class="ai">
        <div class="round-result" v-html="aiRoundResult"></div>
        <Card :cardId="aiCard"/>
        <p class="name">{{ aiName }}</p>
      </div>
      <div class="buttons">
        <Button v-if="!isEndOfGame" :clickFunc="onNextRound" btnText="NEXT ROUND"></Button>
        <Button v-else :clickFunc="onEndGame" :params="[false,]" class="red" btnText="QUIT"></Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./Resolution.scss" />
<script lang="javascript" src="./Resolution.js" />
