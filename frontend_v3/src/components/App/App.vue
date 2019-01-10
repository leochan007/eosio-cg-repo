<template>
  <div id="app">
    <RulesModal/>
    <div :class="className">
    <div v-if="needLogin"><Login :onLogin="handleLogin" :onLogout="handleLogout"/></div>
    <div v-else><Game :onLogout="handleLogout"/></div>
    <div v-if="loading" class="spinner">
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
    </div>
  </div>
</template>

<style lang="scss" src="./reset.scss" />
<style lang="scss" src="./App.scss" />
<script lang="javascript" src="./App.js" />
