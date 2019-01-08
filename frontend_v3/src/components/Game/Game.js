import PlayerProfile from '@/components/Game/components/PlayerProfile/PlayerProfile.vue';
import GameMat from '@/components/Game/components/GameMat/GameMat.vue';
import Resolution from '@/components/Game/components/Resolution/Resolution.vue';
import GameInfo from '@/components/Game/components/GameInfo/GameInfo.vue';

import appStatus from '@/const/appstatus';

import errCode from '@/const/errorcode';
import ApiService from '@/services/ApiService';
import {
    bus,
    EVENT_STATUS_CHANGED
} from '@/utils/event';

import voca from 'voca';

import {
    mapState,
    mapGetters,
    mapActions,
} from 'vuex';

import * as Actions from '@/store/constants'

export default {
    props: {
        onLogout: Function,
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        name() {
            if (!voca.isBlank(this.account)) {
                return this.account.name;
            }
            return '';
        },
        win_count() {
            if (!voca.isBlank(this.user)) {
                return this.user.win_count;
            }
            return 0;
        },
        lost_count() {
            if (!voca.isBlank(this.user)) {
                return this.user.lost_count;
            }
            return 0;
        },
        game() {
            if (!voca.isBlank(this.user) && !voca.isBlank(this.user.game_data))
                return this.user.game_data;
            return null;
        },
        isGameStarted() {
            return this.game && this.game.deck_ai.length !== 17;
        },
        ...mapState(['user']),
        ...mapGetters(['account']),
    },
    mounted() {},
    components: {
        PlayerProfile,
        GameMat,
        Resolution,
        GameInfo,
    },
    methods: {

        setGameLoading(loading) {
            this.loading = loading;
        },

        handleStartGame() {
            const self = this;

            self.setGameLoading(true);

            ApiService.startGame().then((res) => {
                // console.log('---handleStartGame---res:', res.error_code);

                if (res.error_code === errCode.OK) {
                    bus.$emit(EVENT_STATUS_CHANGED, appStatus.STARTED);
                }
                self.setGameLoading(false);
            }).catch(() => {
                self.setGameLoading(false);
            });
        },

        handlePlayCard(cardIdx) {
            const self = this;

            if (self.user.game_data.hand_player[cardIdx] === 0) {
                return;
            }

            self.setGameLoading(true);

            ApiService.playCard(cardIdx).then((res) => {
                // console.log('---handlePlayCard---res:', res.error_code);

                if (res.error_code === errCode.OK) {
                    bus.$emit(EVENT_STATUS_CHANGED, appStatus.STARTED);
                }
                self.setGameLoading(false);

            }).catch(() => {
                self.setGameLoading(false);
            });
            
            /*
            setTimeout(() => {
            }, 5000);
            */
        },

        handleNextRound() {
            const self = this;

            self.setGameLoading(true);

            ApiService.nextRound().then((res) => {
                // console.log('---handleNextRound---res:', res.error_code);

                if (res.error_code === errCode.OK) {
                    bus.$emit(EVENT_STATUS_CHANGED, appStatus.STARTED);
                }
                self.setGameLoading(false);
            }).catch(() => {
                self.setGameLoading(false);
            });
        },

        async handleEndGame(params) {
            const self = this;

            self.setGameLoading(true);

            let isForce = 0;

            if (!voca.isBlank(params) && params.length > 0) {
                if (params[0]) {
                    isForce = 1;
                }
            }

            // console.log('handleEndGame isForce:', isForce);

            ApiService.endGame(isForce).then((res) => {
                // console.log('---handleEndGame---res:', res.error_code);

                if (res.error_code === errCode.OK) {
                    bus.$emit(EVENT_STATUS_CHANGED, appStatus.END_OF_GAME);
                }
                self.setGameLoading(false);
            }).catch(() => {
                self.setGameLoading(false);
            });
        },

        ...mapActions([
            Actions.SET_LOADING,
            Actions.SET_STATUS,
        ]),

    },
    name: 'Game',
};