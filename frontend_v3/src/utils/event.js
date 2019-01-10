import Vue from 'vue';

const EVENT_STATUS_CHANGED = 'status_changed';

const EVENT_SCATTER_READY = 'scatter_ready';

const EVENT_SCATTER_FAILED = 'scatter_failed';

const EVENT_EOS_LOGIN_SUCCESS = 'eos_login_success';

const EVENT_EOS_LOGIN_FAIL = 'eos_login_fail';

const EVENT_EOS_LOGOUT = 'eos_logout';

let bus = new Vue();

export {
    EVENT_STATUS_CHANGED,
    EVENT_SCATTER_READY,
    EVENT_SCATTER_FAILED,
    EVENT_EOS_LOGIN_SUCCESS,
    EVENT_EOS_LOGIN_FAIL,
    EVENT_EOS_LOGOUT,
    bus,
}
