import {Injectable} from '@angular/core';
import {Match} from './match';
import {PlayerStatistics} from './playerStatistics';

@Injectable()
export class MatchService {

    calculateWinner(matches: Array<Match>) {
        let winners: Array<PlayerStatistics> = this.calculateWinners(matches);

        let mostWins = winners[0].wonCount;
        let equalWins = winners.filter((w) => w.wonCount === mostWins);
        if (equalWins.length === 1) { return equalWins[0].player; } // 1. Vundne kampe
        if (equalWins.length === 2) { return this.findMutualMatch(equalWins, matches).winner; } // 2. Indbyrdes

        let mostSets = equalWins[0].setDiff;
        let equalSets = equalWins.filter((w) => w.setDiff === mostSets);
        if (equalSets.length === 1) { return equalSets[0].player; } // 3. Difference i sæt
        if (equalSets.length === 2) { return this.findMutualMatch(equalSets, matches).winner; } // 3. Difference i sæt. Indbyrdes

        let mostPoints = equalSets[0].pointDiff;
        let equalPoints = equalSets.filter((w) => w.pointDiff === mostPoints);
        if (equalPoints.length === 1) { return equalPoints[0].player; } // 4. Difference i point
        if (equalPoints.length === 2) { return this.findMutualMatch(equalPoints, matches).winner; } // 4. Difference i point. Indbyrdes.

        return null; // Winner not determined. To be found by draw!
    }

    private findMutualMatch(stats: Array<any>, matches: Array<Match>) {
        let p1 = stats[0].player;
        let p2 = stats[1].player;

        return matches.find((m: Match) => (m.player1 === p1 && m.player2 === p2) || (m.player1 === p2 && m.player2 === p1));
    }

    private calculatePlayerStats(matches: Array<Match>): { [key: string]: PlayerStatistics; } {
        let hashMap: { [key: string]: PlayerStatistics; } = {};
        for (let match of matches.filter((m: Match) => m.matchDone)) {
            let winningPlayerHash = hashMap[match.winner.name] || ( hashMap[match.winner.name] = {
                player: match.winner,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            winningPlayerHash.wonCount++;
            winningPlayerHash.setDiff += match.setDiff;
            winningPlayerHash.pointDiff += match.pointDiff;

            let loosingPlayerHash = hashMap[match.looser.name] || (hashMap[match.looser.name] = {
                player: match.looser,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            loosingPlayerHash.setDiff -= match.setDiff;
            loosingPlayerHash.pointDiff -= match.pointDiff;
        }

        return hashMap;
    }

    private calculateWinners(matches: Array<Match>): Array<PlayerStatistics> {
        let hash: { [key: string]: PlayerStatistics; } = this.calculatePlayerStats(matches);
        if (Object.keys(hash).length === 0) { throw new RangeException('No finished matches.'); }

        let array = new Array<any>();
        /* tslint:disable */
        for (let key in hash) {
            array.push(hash[key]);
        }
        /* tslint:enable */

        return array.sort((i1, i2) =>  {
            let wonDiff = i2.wonCount - i1.wonCount;
            if (wonDiff !== 0) { return wonDiff; }
            let setDiff = i2.setDiff - i1.setDiff;
            if (setDiff !== 0) { return setDiff; }

            return i2.pointDiff - i1.pointDiff;
        });
    }
 }
