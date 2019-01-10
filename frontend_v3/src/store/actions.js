import * as Actions from './constants'

export default {

  [Actions.SET_SCATTER]:({commit}, scatter) => commit(Actions.SET_SCATTER, scatter),

  [Actions.SET_EOS]:({commit}, eos) => commit(Actions.SET_EOS, eos),

  [Actions.SET_USER]:({commit}, user) => commit(Actions.SET_USER, user),

  [Actions.SET_STATUS]:({commit}, status) => commit(Actions.SET_STATUS, status),

  [Actions.SET_ERROR]:({commit}, error) => commit(Actions.SET_ERROR, error),

  [Actions.SET_LOADING]:({commit}, loading) => commit(Actions.SET_LOADING, loading),

  [Actions.SET_ACCOUNT]:({commit}, account) => commit(Actions.SET_ACCOUNT, account),

  //async actions
  setScatterAsync({ commit }, scatter, timeout) {
    setTimeout(() => {
      commit(Actions.SET_SCATTER, scatter);
    }, timeout);
  },
};
