import Button from '@/components/Button/Button.vue';

export default {
    props: {
        name: '',
        winCount: 0,
        lostCount: 0,
        onLogout: Function,
        onStartGame: Function,
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    components: {
        Button,
    },
    methods: {
    },
    name: 'PlayerProfile',
};
