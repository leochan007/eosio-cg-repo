import Login from '@/components/Login/Login.vue';
import Game from '@/components/Game/Game.vue';

import RulesModal from '@/components/Game/components/GameInfo/components/RulesModal/RulesModal.vue';

import {
    initScatter,
} from '@/utils/scatter';

import {
    mapState,
    mapGetters,
    mapActions,
} from 'vuex';

import errCode from '@/const/errorcode';

import * as Actions from '@/store/constants';

import appStatus from '@/const/appstatus';

import {
    bus,
    EVENT_STATUS_CHANGED,
    EVENT_SCATTER_READY,
    EVENT_SCATTER_CONNECTION_FAILED,
} from '@/utils/event';

import ApiService from '@/services/ApiService';

import voca from 'voca';

export default {
    data() {
        return {}
    },
    computed: {
        className() {
            //return 'App status-' + this.status + (this.loading ? ' loading' : '');
            return 'App status-' + this.status;
        },
        needLogin() {
            return this.status == appStatus.LOGIN || voca.isBlank(this.account) ||
                voca.isBlank(this.account.name) || voca.isBlank(this.user);
        },
        ...mapState(['loading', 'user']),
        ...mapGetters(['debug', 'status', 'account']),
    },
    created() {
        this[Actions.SET_STATUS](appStatus.LOGIN);
        this[Actions.SET_LOADING](false);
    },
    mounted() {

        const self = this;

        bus.$on(EVENT_SCATTER_CONNECTION_FAILED, async () => {
            self[Actions.SET_ERROR](errCode.ERROR_SCATTER_CONNECTION_FAILED);
            self[Actions.SET_LOADING](false);
        });

        bus.$on(EVENT_SCATTER_READY, async () => {

            const res = await self.loginEOS();
            console.log(res);

            if (res.error_code == errCode.OK) {

                ApiService.loginGame().then((res) => {
                    // console.log('---handleLogin---res:', res.error_code);

                    if (res.error_code === errCode.OK) {
                        bus.$emit(EVENT_STATUS_CHANGED, appStatus.PROFILE);
                    } else {
                        self[Actions.SET_LOADING](false);
                        self[Actions.SET_ERROR](res.message);
                    }
                }).catch((err) => {
                    self[Actions.SET_LOADING](false);
                    self[Actions.SET_ERROR](err);
                });

            } else {
                self[Actions.SET_LOADING](false);
                self[Actions.SET_ERROR](res.message);
            }
        })

        bus.$on(EVENT_STATUS_CHANGED, async (newStatus) => {

            let status = newStatus;

            if (!voca.isBlank(self.account)) {

                await self.fetchUserInfo(self.account.name);
                if (!voca.isBlank(self.user) && !voca.isBlank(self.user.game_data)) {
                    const game = self.user.game_data;
                    if (game && game.status !== 0) {
                        status = appStatus.END_OF_GAME;
                    } else if (game && game.selected_card_ai > 0) {
                        status = appStatus.CARD_SELECTED;
                    } else if (game && game.deck_ai.length !== 17) {
                        status = appStatus.STARTED;
                    } else if (name) {
                        status = appStatus.PROFILE;
                    }
                }

            } else {
                status = appStatus.LOGIN;
            }

            self[Actions.SET_STATUS](status);

            switch (appStatus) {
                case appStatus.PROFILE:
                case appStatus.STARTED:
                case appStatus.CARD_SELECTED:
                case appStatus.END_OF_GAME:
                    {
                        break;
                    }
                case appStatus.LOGIN:
                    {
                        self[Actions.SET_USER](null);
                        self[Actions.SET_ACCOUNT](null);
                        break;
                    }
                default:
                    break;
            }

            this[Actions.SET_LOADING](false);
        })

    },
    methods: {
        async fetchUserInfo(userName) {
            const user = await ApiService.getUserByName(userName);
            if (this.debug) {
                console.debug('App fetchUserInfo:' + JSON.stringify(user));
            }
            this[Actions.SET_USER](user);
        },

        async loginEOS() {

            const res = await ApiService.loginEOS();
            console.log('loginEOS', res);

            if (res.error_code == errCode.OK) {
                this[Actions.SET_ACCOUNT](res.message);
            }

            return res;

        },

        handleLogin() {

            this[Actions.SET_LOADING](true);

            initScatter();
        },

        handleLogout() {

            const self = this;

            self[Actions.SET_LOADING](true);

            ApiService.logoutGame().then(() => {
                bus.$emit(EVENT_STATUS_CHANGED, appStatus.LOGIN);
            }).catch(() => {
                self[Actions.SET_LOADING](false);
            });
        },
        ...mapActions([
            Actions.SET_LOADING,
            Actions.SET_STATUS,
            Actions.SET_ERROR,
            Actions.SET_USER,
            Actions.SET_ACCOUNT,
        ])
    },
    components: {
        Login,
        Game,
        RulesModal,
    },
    name: 'app',
};