import { scatter, eos } from './scatter';

import errCode from '@/const/errorcode';

import store from '@/store';

const network = store.getters.network;

async function login() {

    if (scatter == null) {
        return { error_code: errCode.FAILED, message: 'not ready! scatter == null' };
    }

    const requiredFields = { accounts: [network] };
    try {
        const identity = await scatter.getIdentity(requiredFields);

        return { error_code: errCode.OK, message: identity };
    } catch (error) {
        console.log(error);
        return { error_code: errCode.FAILED, message: error };
    }
}

async function logout() {
    if (scatter == null) {
        return { error_code: errCode.FAILED, message: 'not ready! scatter == null' };
    }

    try {
        let identity = await scatter.forgetIdentity();
        return { error_code: errCode.OK, message: identity };
    } catch (error) {
        console.log(error);
        return { error_code: errCode.FAILED, message: error };
    }
}

async function identity() {
    if (scatter == null) {
        return { error_code: errCode.FAILED, message: 'not ready! scatter == null' };
    }

    try {
        let identity = await scatter.getIdentityFromPermissions();
        return { error_code: errCode.OK, message: identity };
    } catch (error) {
        return { error_code: errCode.FAILED, message: error };
    }
}

async function takeAction(name, authority, action, dataValue) {
    
    if (scatter == null) {
        return { error_code: errCode.FAILED, message: 'not ready! scatter == null' };
    }

    //const options = {};
    //const eos = scatter.eos(network, Eos, options);

    try {
        const resultWithConfig = await eos.transaction({
            actions: [{
                account: process.env.VUE_APP_EOS_CONTRACT_NAME,
                name: action,
                authorization: [{
                    actor: name,
                    permission: authority,
                }],
                data: dataValue,
            }]
        }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });

        return { error_code: errCode.OK, message: resultWithConfig };
    } catch (err) {
        console.log('action ' + action + ' got error!');
        console.log(err);
        return { error_code: errCode.ACTION_FAILED, message: err };
    }
}

export default {
    login,
    logout,
    identity,
    takeAction,
}
