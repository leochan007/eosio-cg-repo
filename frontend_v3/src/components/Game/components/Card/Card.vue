<template>
  <a v-if="isA" :class="className" @click="onClick(cardIndex)">
    <span class="type">{{ cardType }}</span>
    <span class="power">{{ power }}</span>
  </a>
  <span v-else :class="className">
    <span class="type">{{ cardType }}</span>
    <span class="power">{{ power }}</span>
  </span>
</template>

<style lang="scss" src="./Card.scss" />
<script lang="javascript" src="./Card.js" />
