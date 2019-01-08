<template>
  <div :class="className">
    <div class="name">{{ name }}</div>
    <div :class="lifeClassName"></div>
    <div class="lifepoints">{{ lifepoints }}/5</div>
  </div>
</template>

<style lang="scss" src="./PlayerInfo.scss" />
<script lang="javascript" src="./PlayerInfo.js" />
