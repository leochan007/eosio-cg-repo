<template>
  <div :class="className">
    <Card
      v-for="ind in Array.from(new Array(4), (x, i) => i)"
      :key="ind"
      :cardIndex="ind"
      :cardId="cards[ind]"
      :onClick="onPlayCard"
    />
  </div>
</template>

<style lang="scss" src="./HandCards.scss" />
<script lang="javascript" src="./HandCards.js" />
