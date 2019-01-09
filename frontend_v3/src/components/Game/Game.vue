<template>
  <section class="Game">
    <div v-if="!isGameStarted">
      <PlayerProfile 
          :name="name" 
          :winCount="win_count" 
          :lostCount="lost_count" 
          :onStartGame="handleStartGame" 
          :onLogout="onLogout" />
    </div>
    <div v-else class="container">
      <GameMat 
          :deckCardCount="game.deck_ai.length" 
          :aiLife="game.life_ai" 
          :aiHandCards="game.hand_ai"
          aiName="COMPUTER" 
          :playerLife="game.life_player"
          :playerHandCards="game.hand_player"
          :playerName="name"
          :onPlayCard="handlePlayCard" />
      <Resolution
          :status="game.status"
          :aiCard="game.selected_card_ai"
          aiName="COMPUTER"
          :aiLost="game.life_lost_ai"
          :playerCard="game.selected_card_player"
          :playerName="name"
          :playerLost="game.life_lost_player"
          :onNextRound="handleNextRound"
          :onEndGame="handleEndGame"
        />
        <GameInfo
          :deckCardCount="game.deck_ai.length"
          :handCardCount="game.hand_ai.filter( x => x > 0 ).length"
          :onEndGame="handleEndGame"
        />
    </div>
    <div v-if="isGameStarted && loading" class="spinner">
      <div class="image"></div>
      <div class="circles">
        <div class="circle">
          <div class="inner"></div>
        </div>
        <div class="circle">
          <div class="inner"></div>
        </div>
        <div class="circle">
          <div class="inner"></div>
        </div>
        <div class="circle">
          <div class="inner"></div>
        </div>
        <div class="circle">
          <div class="inner"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./Game.scss" />
<script lang="javascript" src="./Game.js" />
