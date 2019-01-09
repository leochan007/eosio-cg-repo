import voca from 'voca';

const debug = process.env.NODE_ENV !== 'production';

export default {

  scatter: state => {
    return state.scatter;
  },

  eos: state => {
    return state.eos;
  },

  user: state => {
    return state.user;
  },

  status: state => {
    return state.status;
  },

  loading: state => {
    return state.loading;
  },

  account: state => {
    let account = state.account;
    if (voca.isBlank(account)) {
      try {
        if (window.localStorage && window.localStorage.account) {
          account = JSON.parse(window.localStorage.account);
        }
      }catch (e) {
        account = null;
      }
    }
    return account;
  },

  network: state => {
    return state.network;
  },

  debug: () => {
    return debug;
  },

};