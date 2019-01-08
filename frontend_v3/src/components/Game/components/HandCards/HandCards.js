import Card from '@/components/Game/components/Card/Card.vue';

import voca from 'voca';

export default {
    props: {
        propClass: '',
        cards: Array,
        onPlayCard: Function,
    },
    computed: {
        className() {
            return 'HandCards' + (voca.isBlank(this.propClass) ? '' : ' ' + this.propClass);
        }
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    components: {
        Card,
    },
    methods: {
    },
    name: 'HandCards',
};
