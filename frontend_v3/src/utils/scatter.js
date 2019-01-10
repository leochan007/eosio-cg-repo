import ScatterJS from 'scatterjs-core';

import ScatterEOS from 'scatterjs-plugin-eosjs';

import Eos from 'eosjs';

import {
    bus,
    EVENT_SCATTER_READY,
    EVENT_SCATTER_FAILED
} from '@/utils/event';

import store from '@/store';

const connectionOptions = {
    initTimeout: 10000
};

const network = store.getters.network;

let scatter = null;

let eos = null;

function initScatter() {

    ScatterJS.plugins(new ScatterEOS());

    ScatterJS.scatter.connect("demo", connectionOptions).then(connected => {

        if (!connected) return false;

        scatter = ScatterJS.scatter;

        const eosOptions = {};
        eos = scatter.eos(network, Eos, eosOptions);

        window.ScatterJS = null;

        bus.$emit(EVENT_SCATTER_READY, {});

    }).then(err => {
        bus.$emit(EVENT_SCATTER_FAILED, err);
    });
}

function init_windows() {

    document.addEventListener('scatterLoaded', () => {

        window.ScatterJS.scatter.requireVersion(3.0);
        scatter = window.ScatterJS.scatter;

        const eosOptions = {};
        eos = scatter.eos(network, Eos, eosOptions);

        window.ScatterJS = null;

        bus.$emit(EVENT_SCATTER_READY, {});
    })
}

export {
    scatter,
    eos,
    initScatter,
    init_windows,
}