export default {
    props: {
        cardIndex: Number,
        cardId: Number,
        onClick: Function,
    },
    data() {
        // Card dictionary from smart contract
        // { [cardType, cardPower], ... }
        return {
            cardDict: [
                [0, 0], // empty card (for the case the card is played or empty selected card)
                [1, 1],
                [1, 1],
                [1, 2],
                [1, 2],
                [1, 3],
                [2, 1],
                [2, 1],
                [2, 2],
                [2, 2],
                [2, 3],
                [3, 1],
                [3, 1],
                [3, 2],
                [3, 2],
                [3, 3],
                [4, 3],
                [5, 0]
            ]
        }
    },
    computed: {
        className() {
            return 'Card type' + this.cardDict[this.cardId][0] + ' card' + this.cardId;
        },
        isA() {
            return (this.cardId !== 0 && this.onClick);
        },
        cardType() {
            let cardType = "";
            switch (this.cardDict[this.cardId][0]) {
              case 1:
                cardType = "FIRE";
                break;
              case 2:
                cardType = "WOOD";
                break;
              case 3:
                cardType = "WATER";
                break;
              case 4:
              case 5:
                cardType = "SPECIAL";
                break;
              default:
                cardType = "EMPTY";
            }
            return cardType;
        },
        power() {
            if (this.cardId !== 0)
                return this.cardDict[this.cardId][1];
            return '';
        }
    },
    mounted() {},
    components: {},
    name: 'Card',
};