import Button from '@/components/Button/Button.vue';

export default {
    props: {
        onLogin: Function,
        onLogout: Function,
    },
    data() {
        return {
        }
    },
    components: {
        Button,
    },
    methods: {
    },
    name: 'Login',
};
