import Login from '@/components/Login/Login.vue';
import Game from '@/components/Game/Game.vue';

import RulesModal from '@/components/Game/components/GameInfo/components/RulesModal/RulesModal.vue';

import {
    init,
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
} from '@/utils/event';

import ApiService from '@/services/ApiService';

import voca from 'voca';

export default {
    data() {
        return {}
    },
    computed: {
        className() {
            return 'App status-' + this.status + (this.loading ? ' loading' : '');
        },
        needLogin() {
            return this.status == appStatus.LOGIN || voca.isBlank(this.account) ||
                voca.isBlank(this.account.name) || voca.isBlank(this.user);
        },
        ...mapState(['loading', 'status', 'user']),
        ...mapGetters(['account']),
    },
    created() {
    },
    mounted() {

        this[Actions.SET_LOADING](true);

        bus.$on(EVENT_SCATTER_READY, async () => {
            await this.loginEOS();
        })

        bus.$on(EVENT_STATUS_CHANGED, async (newStatus) => {

            await this.fetchUserInfo(this.account.name);

            let status = newStatus;
            if (!voca.isBlank(this.user) && !voca.isBlank(this.user.game_data)) {
                const game = this.user.game_data;
                if (game && game.status !== 0) {
                    status = appStatus.END_OF_GAME;
                } else if (game && game.selected_card_ai > 0) {
                    status = appStatus.CARD_SELECTED;
                }
            }

            this[Actions.SET_STATUS](status);

            switch (appStatus) {
                case appStatus.PROFILE:
                case appStatus.STARTED:
                case appStatus.CARD_SELECTED:
                case appStatus.END_OF_GAME:
                case appStatus.LOGIN:
                    {
                        break;
                    }
                default:
                    break;
            }

            this[Actions.SET_LOADING](false);
        })

        init();

    },
    methods: {
        async fetchUserInfo(userName) {
            const user = await ApiService.getUserByName(userName);
            console.log('App fetchUserInfo:' + JSON.stringify(user));
            this[Actions.SET_USER](user);
        },

        async loginEOS() {

            const res = await ApiService.loginEOS();

            if (res.error_code != 0) {
                console.log('EVENT_SCATTER_READY got error!', JSON.stringify(res.message));
                return;
            }

            this[Actions.SET_ACCOUNT](res.message);

            bus.$emit(EVENT_STATUS_CHANGED, appStatus.LOGIN);

        },

        handleLogin() {

            const self = this;

            self[Actions.SET_LOADING](true);
            ApiService.loginGame().then((res) => {
                console.log('---handleLogin---res:', res.error_code);

                if (res.error_code === errCode.OK) {
                    bus.$emit(EVENT_STATUS_CHANGED, appStatus.PROFILE);
                }
            }).catch(() => {
                self[Actions.SET_LOADING](false);
            });
        },

        handleLogout() {

            const self = this;

            self[Actions.SET_LOADING](true);

            ApiService.logoutGame().then(() => {
                self.loginEOS().then(() => {
                    this[Actions.SET_LOADING](false);
                }).catch(() => {
                    this[Actions.SET_LOADING](false);
                })
            }).catch(() => {
                this[Actions.SET_LOADING](false);
            });
        },
        ...mapActions([
            Actions.SET_LOADING,
            Actions.SET_STATUS,
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