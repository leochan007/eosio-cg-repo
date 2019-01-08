<template>
  <table :class="className">
    <tbody>
      <tr>
        <td class="mat mat-ai">
          <PlayerInfo propClass="ai" :name="aiName" :life="aiLife" />
          <div :class="aiDeckClassName">
            {{ aiName }}'S Deck ({{ deckCardCount }})
          </div>
          <HandCards propClass="ai" :cards="aiHandCards" />
        </td>
      </tr>
      <tr>
        <td class="mat mat-player">
          <PlayerInfo propClass="player" :name="playerName" :life="playerLife" />
          <div :class="playerDeckClassName">
            {{ playerName }}'S Deck ({{ deckCardCount }})
          </div>
          <HandCards propClass="player" :cards="playerHandCards" :onPlayCard="onPlayCard" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" src="./GameMat.scss" />
<script lang="javascript" src="./GameMat.js" />
