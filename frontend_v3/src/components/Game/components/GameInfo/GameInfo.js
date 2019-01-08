import Button from '@/components/Button/Button.vue';

import voca from 'voca';

export default {
    props: {
        propClass: '',
        deckCardCount: 0,
        handCardCount: 0,
        onEndGame: Function,
    },
    data() {
        return {
        }
    },
    computed: {
        className() {
            return 'Info' + (voca.isBlank(this.propClass) ? '' : ' ' + this.propClass);
        },
        restRound() {
            return 18 - this.deckCardCount - this.handCardCount;
        }
    },
    mounted() {
    },
    components: {
        Button,
    },
    methods: {
        openRules() {
            this.$modal.show('rules-modal');
        }
    },
    name: 'GameInfo',
};
