import voca from 'voca';

export default {
    props: {
        className: '',
        btnText: '',
        loading: false,
        params: Array,
        clickFunc: Function,
    },
    computed: {
        class_name() {
            return 'Button' + (voca.isBlank(this.className) ? '' : (' ' + this.className)) 
            + (this.loading ? ' loading' : '');
        },
    },
    components: {},
    name: 'Button',
};
