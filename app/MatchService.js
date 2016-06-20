"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var MatchService = (function () {
    function MatchService() {
    }
    MatchService.prototype.calculateWinner = function (matches) {
        var winners = this.calculateWinners(matches);
        var mostWins = winners[0].wonCount;
        var equalWins = winners.filter(function (w) { return w.wonCount === mostWins; });
        if (equalWins.length === 1) {
            return equalWins[0].player;
        } // 1. Vundne kampe
        if (equalWins.length === 2) {
            return this.findMutualMatch(equalWins, matches).winner;
        } // 2. Indbyrdes
        var mostSets = equalWins[0].setDiff;
        var equalSets = equalWins.filter(function (w) { return w.setDiff === mostSets; });
        if (equalSets.length === 1) {
            return equalSets[0].player;
        } // 3. Difference i sæt
        if (equalSets.length === 2) {
            return this.findMutualMatch(equalSets, matches).winner;
        } // 3. Difference i sæt. Indbyrdes
        var mostPoints = equalSets[0].pointDiff;
        var equalPoints = equalSets.filter(function (w) { return w.pointDiff === mostPoints; });
        if (equalPoints.length === 1) {
            return equalPoints[0].player;
        } // 4. Difference i point
        if (equalPoints.length === 2) {
            return this.findMutualMatch(equalPoints, matches).winner;
        } // 4. Difference i point. Indbyrdes.
        return null; // Winner not determined. To be found by draw!
    };
    MatchService.prototype.findMutualMatch = function (stats, matches) {
        var p1 = stats[0].player;
        var p2 = stats[1].player;
        return matches.find(function (m) { return (m.player1 === p1 && m.player2 === p2) || (m.player1 === p2 && m.player2 === p1); });
    };
    MatchService.prototype.calculatePlayerStats = function (matches) {
        var hashMap = {};
        for (var _i = 0, _a = matches.filter(function (m) { return m.matchDone; }); _i < _a.length; _i++) {
            var match = _a[_i];
            var winningPlayerHash = hashMap[match.winner.name] || (hashMap[match.winner.name] = {
                player: match.winner,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            winningPlayerHash.wonCount++;
            winningPlayerHash.setDiff += match.setDiff;
            winningPlayerHash.pointDiff += match.pointDiff;
            var loosingPlayerHash = hashMap[match.looser.name] || (hashMap[match.looser.name] = {
                player: match.looser,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            loosingPlayerHash.setDiff -= match.setDiff;
            loosingPlayerHash.pointDiff -= match.pointDiff;
        }
        return hashMap;
    };
    MatchService.prototype.calculateWinners = function (matches) {
        var hash = this.calculatePlayerStats(matches);
        if (Object.keys(hash).length === 0) {
            throw new RangeException('No finished matches.');
        }
        var array = new Array();
        /* tslint:disable */
        for (var key in hash) {
            array.push(hash[key]);
        }
        /* tslint:enable */
        return array.sort(function (i1, i2) {
            var wonDiff = i2.wonCount - i1.wonCount;
            if (wonDiff !== 0) {
                return wonDiff;
            }
            var setDiff = i2.setDiff - i1.setDiff;
            if (setDiff !== 0) {
                return setDiff;
            }
            return i2.pointDiff - i1.pointDiff;
        });
    };
    MatchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MatchService);
    return MatchService;
}());
exports.MatchService = MatchService;
//# sourceMappingURL=MatchService.js.map