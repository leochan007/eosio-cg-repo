<template>
      <div :class="className">
        <p>ROUND <span class="round-number">{{ 18 - deckCardCount - handCardCount }}/17</span></p>
        <Button :clickFunc="openRules" className="small blue" btnText="RULES"></Button>
        <Button :clickFunc="onEndGame" :params="[true,]" className="small red" btnText="GIVE UP"></Button>
      </div>
</template>

<style lang="scss" src="./GameInfo.scss" />
<script lang="javascript" src="./GameInfo.js" />
