import PlayerInfo from '@/components/Game/components/PlayerInfo/PlayerInfo.vue';
import HandCards from '@/components/Game/components/HandCards/HandCards.vue';

import voca from 'voca';

export default {
    props: {
        propClass: '',
        deckCardCount: '',
        aiLife: '',
        aiHandCards: Array,
        aiName: '',
        playerLife: '',
        playerHandCards: Array,
        playerName: '',
        onPlayCard: Function,
    },
    data() {
        return {
        }
    },
    computed: {
        aiDeckClassName() {
            return this.deckClassName('ai');
        },
        playerDeckClassName() {
            return this.deckClassName('player');
        },
        className() {
            return 'GameMat' + (voca.isBlank(this.propClass) ? '' : ' ' + this.propClass);
        },
    },
    mounted() {
    },
    components: {
        PlayerInfo,
        HandCards,
    },
    methods: {
        deckClassName(item) {
            return 'deck '+ item + ' remain' + this.deckCardCount;
        }
    },
    name: 'GameMat',
};
