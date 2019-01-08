<template>
  <div class="PlayerProfile">
    <div class="title">Elemental Battles - powered by EOSIO</div>
    <div class="welcome">
      <span>Welcome</span>
    </div>
    <div class="username">
      <span>{{ name }}</span>
    </div>
    <div class="record">
      <p>Your Current Record</p>
      <span>Win
        <span class="count">{{ winCount }}</span>
      </span>
      <span>|</span>
      <span>Lost
        <span class="count">{{ lostCount }}</span>
      </span>
    </div>
    <div class="buttons">
      <div>
        <Button :clickFunc="onStartGame" class="green" btnText="START"></Button>
        <Button :clickFunc="onLogout" class="red" btnText="LOGOUT"></Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./PlayerProfile.scss" />
<script lang="javascript" src="./PlayerProfile.js" />
