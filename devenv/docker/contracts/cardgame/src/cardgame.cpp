#include "gameplay.cpp"

ACTION cardgame::login(eosio::name userName) {
  // Ensure this action is authorized by the player
  require_auth(userName);

  users_index _users(_self, get_code().value);

  // Create a record in the table if the player doesn't exist in our app yet
  auto user_iterator = _users.find(userName.value);
  if (user_iterator == _users.end()) {
    user_iterator = _users.emplace(userName, [&](auto& new_user) {
      new_user.userName = userName;
    });
  }
}

ACTION cardgame::startgame(eosio::name userName) {
  // Ensure this action is authorized by the player
  require_auth(userName);

  users_index _users(_self, get_code().value);

  auto& user = _users.get(userName.value, "User doesn't exist");

  _users.modify(user, userName, [&](auto& modified_user) {
    // Create a new game
    game game_data;

    // Draw 4 cards each for the player and the AI
    for (uint8_t i = 0; i < 4; i++) {
      draw_one_card(game_data.deck_player, game_data.hand_player);
      draw_one_card(game_data.deck_ai, game_data.hand_ai);
    }

    // Assign the newly created game to the player
    modified_user.game_data = game_data;
  });
}

ACTION cardgame::endgame(eosio::name userName, bool is_force) {
  // Ensure this action is authorized by the player
  require_auth(userName);

  users_index _users(_self, get_code().value);

  // Get the user and reset the game
  auto& user = _users.get(userName.value, "User doesn't exist");
  _users.modify(user, userName, [&](auto& modified_user) {
    modified_user.game_data = game();
    if (is_force) {
      modified_user.lost_count++;
    }
  });
}

ACTION cardgame::playcard(eosio::name userName, uint8_t player_card_idx) {
  // Ensure this action is authorized by the player
  require_auth(userName);

  users_index _users(_self, get_code().value);

  // Checks that selected card is valid
  eosio_assert(player_card_idx < 4, "playcard: Invalid hand index");

  auto& user = _users.get(userName.value, "User doesn't exist");

  // Verify game status is suitable for the player to play a card
  eosio_assert(user.game_data.status == ONGOING,
               "playcard: This game has ended. Please start a new one");
  eosio_assert(user.game_data.selected_card_player == 0,
               "playcard: The player has played his card this turn!");

  _users.modify(user, userName, [&](auto& modified_user) {
    game& game_data = modified_user.game_data;

    // Assign the selected card from the player's hand
    game_data.selected_card_player = game_data.hand_player[player_card_idx];
    game_data.hand_player[player_card_idx] = 0;

    // AI picks a card
    int ai_card_idx = ai_choose_card(game_data);
    game_data.selected_card_ai = game_data.hand_ai[ai_card_idx];
    game_data.hand_ai[ai_card_idx] = 0;

    resolve_selected_cards(game_data);

    update_game_status(modified_user);
  });
}

ACTION cardgame::nextround(eosio::name userName) {
  // Ensure this action is authorized by the player
  require_auth(userName);

  users_index _users(_self, get_code().value);

  auto& user = _users.get(userName.value, "User doesn't exist");

  // Verify game status
  eosio_assert(user.game_data.status == ONGOING,
              "nextround: This game has ended. Please start a new one.");
  eosio_assert(user.game_data.selected_card_player != 0 && user.game_data.selected_card_ai != 0,
               "nextround: Please play a card first.");

  _users.modify(user, userName, [&](auto& modified_user) {
    game& game_data = modified_user.game_data;

    // Reset selected card and damage dealt
    game_data.selected_card_player = 0;
    game_data.selected_card_ai = 0;
    game_data.life_lost_player = 0;
    game_data.life_lost_ai = 0;

    // Draw card for the player and the AI
    if (game_data.deck_player.size() > 0) draw_one_card(game_data.deck_player, game_data.hand_player);
    if (game_data.deck_ai.size() > 0) draw_one_card(game_data.deck_ai, game_data.hand_ai);
  });
}

EOSIO_DISPATCH(cardgame, (login)(startgame)(playcard)(nextround)(endgame))
