<template>
  <div id="app">
    <RulesModal/>
    <div :class="className">
    <div v-if="needLogin"><Login :onLogin="handleLogin" :onLogout="handleLogout"/></div>
    <div v-else><Game :onLogout="handleLogout"/></div>
    </div>
  </div>
</template>

<style lang="scss" src="./reset.scss" />
<style lang="scss" src="./App.scss" />
<script lang="javascript" src="./App.js" />
