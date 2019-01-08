import Button from '@/components/Button/Button.vue';
import Card from '@/components/Game/components/Card/Card.vue';

export default {
    props: {
        status: Number,
        aiCard: 0,
        aiName: '',
        aiLost: 0,
        playerCard: 0,
        playerName: '',
        playerLost: 0,
        onNextRound: Function,
        onEndGame: Function,
    },
    computed: {
        isEndOfGame() {
            return this.isCardSelected && this.status !== 0;
        },
        isCardSelected() {
            return this.aiCard > 0;
        },
        className() {
            return 'Resolution' + (this.isCardSelected ? " card-selected" : "");
        },
        result() {
            if (this.aiLost === 0 && this.playerLost === 0) {
                return 0;
            } else if (this.aiLost === 0) {
                return -1;
            }
            return 1;
        },
        aiRoundResult() {
            let tmpRes = '';
            switch(this.result) {
                case 0:
                tmpRes = 'DRAW';
                break;
                case 1:
                tmpRes = '<span>- ' + this.aiLost + '</span>';
                break;
                case -1:
                tmpRes = 'WIN';
                break;
                default:
                break;
            }

            return tmpRes;
        },
        playerRoundResult() {
            let tmpRes = '';
            switch(this.result) {
                case 0:
                tmpRes = 'DRAW';
                break;
                case 1:
                tmpRes = 'WIN';
                break;
                case -1:
                tmpRes = '<span>- ' + this.playerLost + '</span>';
                break;
                default:
                break;
            }

            return tmpRes;}
    },
    data() {
        return {}
    },
    mounted() {},
    components: {
        Button,
        Card,
    },
    methods: {},
    name: 'Resolution',
};