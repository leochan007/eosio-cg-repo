//import { Api, Rpc, SignatureProvider } from 'eosjs';
import Eos from 'eosjs';
import EosApi from 'eosjs-api';
// Main action call to blockchain
async function takeAction(action, dataValue) {
  const privateKey = localStorage.getItem("cardgame_key");

  const config = {
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    keyProvider: [privateKey],
    httpEndpoint: process.env.REACT_APP_EOS_HTTP_ENDPOINT,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
  };

  const eos = Eos(config);
  
  console.log('cardgame_account:'+localStorage.getItem("cardgame_account"));
  console.log('cardgame_key:'+localStorage.getItem("cardgame_key"));
/*
  const rpc = new Rpc.JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
  const signatureProvider = new SignatureProvider([privateKey]);
  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
*/
  // Main call to blockchain after setting action, account_name and data
  try {
    const resultWithConfig = await eos.transaction({
    //const resultWithConfig = await api.transact({
      actions: [{
        account: process.env.REACT_APP_EOS_CONTRACT_NAME,
        name: action,
        authorization: [{
          actor: localStorage.getItem("cardgame_account"),
          permission: 'active',
        }],
        data: dataValue,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    return resultWithConfig;
  } catch (err) {
    throw(err)
  }
}

class ApiService {

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem("cardgame_account")) {
        return reject();
      }
      takeAction("login", { userName: localStorage.getItem("cardgame_account") })
        .then(() => {
          resolve(localStorage.getItem("cardgame_account"));
        })
        .catch(err => {
          localStorage.removeItem("cardgame_account");
          localStorage.removeItem("cardgame_key");
          reject(err);
        });
    });
  }

  static login({ userName, key }) {
    return new Promise((resolve, reject) => {
      localStorage.setItem("cardgame_account", userName);
      localStorage.setItem("cardgame_key", key);
      takeAction("login", { userName: userName })
        .then(() => {
          resolve();
        })
        .catch(err => {
          localStorage.removeItem("cardgame_account");
          localStorage.removeItem("cardgame_key");
          reject(err);
        });
    });
  }

  static startGame() {
    return takeAction("startgame", { userName: localStorage.getItem("cardgame_account") });
  }

  static playCard(cardIdx) {
    return takeAction("playcard", { userName: localStorage.getItem("cardgame_account"), player_card_idx: cardIdx });
  }

  static nextRound() {
    return takeAction("nextround", { userName: localStorage.getItem("cardgame_account") });
  }

  static endGame() {
    return takeAction("endgame", { userName: localStorage.getItem("cardgame_account") });
  }

  static async getUserByName(userName) {
    try {
      const eos = EosApi()

      //const rpc = new Rpc.JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
      //const result = rpc.get_table_rows({
      const result = await eos.getTableRows({
        "json": true,
        "code": process.env.REACT_APP_EOS_CONTRACT_NAME,    // contract who owns the table
        "scope": process.env.REACT_APP_EOS_CONTRACT_NAME,   // scope of the table
        "table": "users",    // name of the table as specified by the contract abi
        "limit": 1,
        "lower_bound": userName,
      });
      return result.rows[0];
    } catch (err) {
      console.error(err);
    }
  }

}

export default ApiService;
