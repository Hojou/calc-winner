export class Match {
    player1: any;
    player2: any;
    player1Sets: Array<number>;
    player2Sets: Array<number>;
    matchDone: Boolean;
    setDiff: number;
    pointDiff: number;
    winner: any;
    looser: any;

    constructor(player1: any, player2: any) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Sets = [];
        this.player2Sets = [];
        this.matchDone = false;
    }

    private calculateSetWinner(setNumber: number) {
        if (this.player1Sets.length < setNumber) { return null; }

        let diff = this.player1Sets[setNumber] - this.player2Sets[setNumber];
        if (!diff) { return null; }

        return diff > 0 ? this.player1 : this.player2;
    }

    finishMatch() {
        let s1 = this.calculateSetWinner(0);
        let s2 = this.calculateSetWinner(1);
        let s3 = this.calculateSetWinner(2);

        this.winner = (s1 === s2) ? s1 : s3;
        if (!this.winner) { return; }

        this.looser = (this.winner === this.player1) ? this.player2 : this.player1;
        this.setDiff = (this.winner === s1 && this.winner === s2) ? 2 : 1;

        this.pointDiff = Math.abs(
            this.player1Sets.reduce((p, s) => p + s, 0) - this.player2Sets.reduce((p, s) => p + s, 0)
        );

        this.matchDone = true;
    }


}
