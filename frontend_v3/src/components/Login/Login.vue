<template>
  <div class="Login">
    <div class="title">Elemental Battles - powered by EOSIO</div>
    <div class="description">Please use the Scatter EOS Account to log into the game. You should have a Scatter client or a Scatter plugin in your browser.</div>
    <div class="field form-error">
      <span v-if="showError" class="error">{{ error }}</span>
    </div>
    <div class="bottom">
      <Button :clickFunc="onLogin" class="green" btnText="LOGIN"></Button>
    </div>
  </div>
</template>

<style lang="scss" src="./Login.scss" />
<script lang="javascript" src="./Login.js" />
