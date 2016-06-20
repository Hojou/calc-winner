"use strict";
var Match = (function () {
    function Match(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Sets = [];
        this.player2Sets = [];
        this.matchDone = false;
    }
    Match.prototype.calculateSetWinner = function (setNumber) {
        if (this.player1Sets.length < setNumber) {
            return null;
        }
        var diff = this.player1Sets[setNumber] - this.player2Sets[setNumber];
        if (!diff) {
            return null;
        }
        return diff > 0 ? this.player1 : this.player2;
    };
    Match.prototype.finishMatch = function () {
        var s1 = this.calculateSetWinner(0);
        var s2 = this.calculateSetWinner(1);
        var s3 = this.calculateSetWinner(2);
        this.winner = (s1 === s2) ? s1 : s3;
        if (!this.winner) {
            return;
        }
        this.looser = (this.winner === this.player1) ? this.player2 : this.player1;
        this.setDiff = (this.winner === s1 && this.winner === s2) ? 2 : 1;
        this.pointDiff = Math.abs(this.player1Sets.reduce(function (p, s) { return p + s; }, 0) - this.player2Sets.reduce(function (p, s) { return p + s; }, 0));
        this.matchDone = true;
    };
    return Match;
}());
exports.Match = Match;
//# sourceMappingURL=match.js.map