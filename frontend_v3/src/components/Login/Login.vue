<template>
  <div class="Login">
    <div class="title">Elemental Battles - powered by EOSIO</div>
    <div class="description">Please use the Scatter EOS Account to log into the game.</div>
    <div class="bottom">
      <Button :clickFunc="onLogin" class="green" btnText="LOGIN"></Button>
      <!--Button :clickFunc="onLogout" class="red" btnText="LOGOUT"></Button-->
    </div>
  </div>
</template>

<style lang="scss" src="./Login.scss" />
<script lang="javascript" src="./Login.js" />
