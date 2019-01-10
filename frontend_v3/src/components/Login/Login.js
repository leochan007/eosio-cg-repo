import Button from '@/components/Button/Button.vue';

import {
    mapState,
} from 'vuex';

import voca from 'voca';

export default {
    props: {
        onLogin: Function,
        onLogout: Function,
    },
    computed: {
        showError() {
            if (!voca.isBlank(this.error)) {
                return true;
            }
            return false;
        },
        ...mapState(['error']),
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
