<template>
  <modal classes="ModalContent" name="rules-modal" width="954px" height="650px">
    <div class="RulesModal">
      <div class="title">Rules</div>
      <ul>
        <li>
          <div>Each player begins with an identical set of cards.</div>
          <div>Creature cards have two attributes:</div>
          <ol>
            <li>Power: 1, 2, or 3</li>
            <li>Element: Wood, Fire, or Water</li>
          </ol>
          <div>There are also 2 special cards:</div>
          <ol>
            <li>PACEHM card voids all results in a round</li>
            <li>SILVRA card has a power of 3, but no elemental compatibility bonus</li>
          </ol>
        </li>
        <li>
          <div>At the start of the game decks are shuffled and each player draws 4 cards. Cards in hand are always face up.</div>
        </li>
        <li>
          <div>Each round, players pick a card. Picks are revealed simultaneously.</div>
          <div class="divider top"></div>
          <dl>
            <dt>Score Calculations</dt>
            <dd>
              <p class="calculation1">
                <span class="power">Attack Power</span>
                <span class="plus">+</span>
                <span class="bonus">Elemental Compatibility Bonus</span>
              </p>
            </dd>
          </dl>
          <div class="calculations">
            <div class="calculation2">
              <div class="description">
                <div>Attack Power</div>
                <div>The attack value shown on the Card</div>
              </div>
            </div>
            <div class="calculation3">
              <div class="description">
                <div>Elemental Compatibility Bonus</div>
                <div>Player will gain 1 extra score when the player card's element type is stronger than the opponent's (Fire > Wood > Water > Fire > etc.). For Special Card 2 (SILVRA), no Elemental Compatibility Bonus is added</div>
              </div>
            </div>
            <div class="calculation4">
              <div class="description">
                <div>Special Card 1 (PACEHM)</div>
                <div>This special 0 Attack Power card voids all results in a round</div>
              </div>
            </div>
            <div class="calculation5">
              <div class="description">
                <div>Special Card 2 (SILVRA)</div>
                <div>This special 3 Attack Power card removes elemental compatibility bonus in a round</div>
              </div>
            </div>
          </div>
          <div class="divider bottom"></div>
        </li>
        <li>
          <div>The player with a higher score wins the round. The losing player loses HP equal to the difference in scores. For example, if Player A has a score of 3 and Player B has a score of 1, Player B will lose 2 HP.</div>
        </li>
        <li>
          <div>The game ends when:</div>
          <ol>
            <li>A player has 0 or less HP. This player is the loser.</li>
            <li>All cards are played. The winner will be the player with the highest life total. If life totals are the same, the AI player wins.</li>
          </ol>
        </li>
      </ul>
    </div>
    <div @click="closeRules">
      <i class="ButtonClose">Close</i>
    </div>
  </modal>
</template>

<style lang="scss" src="./RulesModal.scss" />
<script lang="javascript" src="./RulesModal.js" />
