import { eos, account } from '../utils/scatter';

// Main action call to blockchain
async function takeAction(action, dataValue) {

  console.log('takeAction account:', account.name);

  // Main call to blockchain after setting action, account_name and data
  try {
    const resultWithConfig = await eos.transaction({
      actions: [{
        account: process.env.REACT_APP_EOS_CONTRACT_NAME,
        name: action,
        authorization: [{
          actor: account.name,
          permission: 'active',
        }],
        data: dataValue,
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    console.log('resultWithConfig:' + JSON.stringify(resultWithConfig));
    return resultWithConfig;
  } catch (err) {
    console.log('action ' + action + ' got error!');
    throw(err)
  }
}

class ApiService {

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (!account) {
        return reject();
      }
      takeAction("login", { userName: account.name })
        .then(() => {
          resolve(account.name);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static login({ userName, key }) {
    return new Promise((resolve, reject) => {
      takeAction("login", { userName: account.name })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static startGame() {
    return takeAction("startgame", { userName: account.name });
  }

  static playCard(cardIdx) {
    return takeAction("playcard", { userName: account.name, player_card_idx: cardIdx });
  }

  static nextRound() {
    return takeAction("nextround", { userName: account.name });
  }

  static endGame() {
    return takeAction("endgame", { userName: account.name });
  }

  static async getUserByName(userName) {
    return account.name;
    /*
    try {
      const rpc = new Rpc.JsonRpc(process.env.REACT_APP_EOS_HTTP_ENDPOINT);
      const result = await rpc.get_table_rows({
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
    */
  }

}

export default ApiService;
