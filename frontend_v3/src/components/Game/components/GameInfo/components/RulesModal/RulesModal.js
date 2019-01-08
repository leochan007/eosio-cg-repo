import Button from '@/components/Button/Button.vue';

export default {
    props: {
    },
    data() {
        return {
            onClick: false,
        }
    },
    mounted() {
    },
    components: {
        Button,
    },
    methods: {
        closeRules() {
            this.$modal.hide('rules-modal');
        }
    },
    name: 'RulesModal',
};
