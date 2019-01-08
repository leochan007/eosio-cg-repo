import voca from 'voca';
import * as Mutations from './constants'

export default {

  [Mutations.SET_SCATTER]:(state, scatter) => state.scatter = scatter,

  [Mutations.SET_EOS]:(state, eos) => state.eos = eos,

  [Mutations.SET_USER]:(state, user) => state.user = user,

  [Mutations.SET_STATUS]:(state, status) => state.status = status,

  [Mutations.SET_LOADING]:(state, loading) => state.loading = loading,

  [Mutations.SET_ACCOUNT]:(state, account) => {
    state.account = account;
    try {
      if (voca.isBlank(account)) {
        window.localStorage.removeItem('account');
      } else {
        window.localStorage.account = JSON.stringify(account);
      }
    } catch(e) {
      console.log(e);
    }
  },

};
