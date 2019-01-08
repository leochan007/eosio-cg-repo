import Button from '@/components/Button/Button.vue';

import voca from 'voca';

export default {
    props: {
        propClass: '',
        name: '',
        life: 0,
        onPlayCard: Function,
    },
    data() {
        return {
        }
    },
    computed: {
        lifepoints() {
            return this.life < 0 ? 0 : this.life;
        },
        className() {
            return 'PlayerInfo' + (voca.isBlank(this.propClass) ? '' : ' ' + this.propClass);
        },
        lifeClassName() {
            return 'life life' + this.life;
        }
    },
    mounted() {
    },
    components: {
        Button,
    },
    methods: {
        handleChange() {
        },
    },
    name: 'GameMat',
};
