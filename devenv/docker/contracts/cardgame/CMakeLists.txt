cmake_minimum_required(VERSION 3.13.1)

### Generate the wasm and abi
add_contract(cardgame cardgame src/cardgame.cpp )

target_include_directories(cardgame.wasm
   PUBLIC
   ${CMAKE_CURRENT_SOURCE_DIR}/include)

target_compile_options(cardgame.wasm PUBLIC --std=c++17 -fcolor-diagnostics -R${CMAKE_CURRENT_SOURCE_DIR} )
