import helper from '@/utils/eos_helper';
import EosApi from 'eosjs-api';

import voca from 'voca';
import store from '@/store';

import * as Actions from '@/store/constants';

import errCode from '@/const/errorcode';

const network = store.getters.network;

const options = {
  httpEndpoint: network.protocol + '://' + network.host + ':' + network.port,
  verbose: false,
  fetchConfiguration: {}
}

const eosApi = EosApi(options);

class ApiService {

  static getUser() {
    if (!voca.isBlank(store.getters.account))
      return store.getters.account.name;
    return '';
  }

  static async safeTakeAction(action, dataValue) {

    let account = store.getters.account;

    if (voca.isBlank(account)) {
        const loginInfo = await ApiService.loginEOS();
        if (loginInfo.error_code != 0) {
            return { error_code: errCode.FAILED, message: 'login failed!' };
        }
    }
    
    account = store.getters.account;

    return await helper.takeAction(account.name, account.authority, action, dataValue);

  }

  static async loginEOS() {

    // console.log('loginEOS options-->' + JSON.stringify(options));

    const res = await helper.login();
    if (res.error_code != 0) {
      return res;
    }

    const identity = res.message;
  
    if (identity.accounts.length <= 0) {
        return { error_code: errCode.NO_ACC, message: 'no account!' }
    }

    let account = identity.accounts.find(x => x.blockchain === 'eos');

    if (voca.isBlank(account)) {
        return { error_code: errCode.NO_ACC, message: 'no eos account!' }
    }

    return { error_code: errCode.OK, message: account };
  }

  static async loginGame() {

    let account = store.getters.account;

    // console.log('loginGame account:', JSON.stringify(account));

    const res = await ApiService.safeTakeAction("login", { userName: account.name });

    if (res.error_code != 0) {
        // console.log(res.message);
        return res;
    }

    return res;
  }

  static async logoutGame() {
    store.dispatch(Actions.SET_ACCOUNT, null);
  }

  static async logoutGame2() {
    const res = await helper.logout();
    if (res.error_code == 0) {
      store.dispatch(Actions.SET_ACCOUNT, null);
    }
    return res;
  }

  static async startGame() {
    return await ApiService.safeTakeAction("startgame", { userName: ApiService.getUser() });
  }

  static async playCard(cardIdx) {
    return await ApiService.safeTakeAction("playcard", { userName: ApiService.getUser(), player_card_idx: cardIdx });
  }

  static async nextRound() {
    return await ApiService.safeTakeAction("nextround", { userName: ApiService.getUser() });
  }

  static async endGame(isForce) {
    return await ApiService.safeTakeAction("endgame", { userName: ApiService.getUser(), is_force: isForce });
  }

  static async getUserByName(userName) {
    try {
      const result = await eosApi.getTableRows({
        "json": true,
        "code": process.env.VUE_APP_EOS_CONTRACT_NAME,    // contract who owns the table
        "scope": process.env.VUE_APP_EOS_CONTRACT_NAME,   // scope of the table
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
