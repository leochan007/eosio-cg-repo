import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

let eos = null;

let account = null;

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins( new ScatterEOS() );

// Networks are used to reference certain blockchains.
// They let you get accounts and help you build signature providers.
const network = {
    blockchain:'eos',
    protocol:'http',
    host:'127.0.0.1',
    port:8888,
    chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
}

// First we need to connect to the user's Scatter.
ScatterJS.scatter.connect('My-App').then(connected => {

    // If the user does not have Scatter or it is Locked or Closed this will return false;
    if(!connected) return false;

    const scatter = ScatterJS.scatter;

    // Now we need to get an identity from the user.
    // We're also going to require an account that is connected to the network we're using.
    const requiredFields = { accounts:[network] };
    scatter.getIdentity(requiredFields).then(() => {

        // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
        // the user for their account name beforehand. They could still give you a different account.
        account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

        console.log('after connect. account:' + JSON.stringify(account));

        // You can pass in any additional options you want into the eosjs reference.
        const eosOptions = { expireInSeconds:3600 };

        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        eos = scatter.eos(network, Eos, eosOptions);

        // ----------------------------
        // Now that we have an identity,
        // an EOSIO account, and a reference
        // to an eosjs object we can send a transaction.
        // ----------------------------

        // Never assume the account's permission/authority. Always take it from the returned account.
        //const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

        /*
        eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
            // That's it!
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }).catch(error => {
            console.error(error);
        });
        */

    }).catch(error => {
        // The user rejected this request, or doesn't have the appropriate requirements.
        console.error(error);
    });
});

export {
    eos,
    account,
};
