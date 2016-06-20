"use strict";
/* tslint:disable:no-unused-variable */
var MatchService_1 = require('./MatchService');
var match_1 = require('./match');
var testing_1 = require('@angular/core/testing');
////////  SPECS  /////////////
/*
1. Vundne kampe: Spillerne rangeres efter antallet af vundne kampe. Spilleren med
flest vundne kampe rangeres højest.

2. Hvis to spillere står lige i antal vundne kampe rangeres vinderen af den indbyrdes
kamp højest.

3. Difference i sæt: Hvis mere end to spillere står lige i vundne kampe rangeres spillerne
efter forskellen mellem vundne og tabte sæt. Spilleren med højeste dif-ference
rangeres højest. Hvis to spillere derefter stadig står lige rangeres vinderen af den
indbyrdes kamp højest.

4. Difference i point: Hvis mere end to spillere står lige i antallet af vundne kampe
og differencen mellem vundne og tabte sæt rangeres spillerne efter forskellen mellem
vundne og tabte point. Spilleren med størst difference rangeres højest. Hvis to
spillere derefter stadig står lige rangeres vinderen af den indbyrdes kamp højest.

Lodtrækning: Hvis to eller flere spillere derefter stadig står lige foretages lodtrækning
mellem disse spillere. Samtlige kampe i puljen medtages, når man skal finde
puljevinderen.
Hvis en spiller/et par udgår under turneringen medregnes vedkommende spillers/
parrets resultater ikke ved udregningen.
Turneringsledelsen er øverste myndighed. Enhver spiller er forpligtet til ubetinget at
efterkomme anvisninger fra turneringsledelsen.
Tvivlsspørgsmål angående fortolkning af spillereglerne afgøres af turneringsledelsen
*/
var p1;
var p2;
var p3;
var p4;
var p5;
var sut;
var matches;
function sharedSetup() {
    testing_1.beforeEach(function () {
        p1 = { name: 'p1' };
        p2 = { name: 'p2' };
        p3 = { name: 'p3' };
        p4 = { name: 'p4' };
        p5 = { name: 'p5' };
        sut = new MatchService_1.MatchService();
        matches = new Array();
    });
    afterEach(function () {
        sut = null;
        matches = null;
    });
}
function createMatch(player1, player2, p11, p21, p12, p22, p13, p23) {
    if (p13 === void 0) { p13 = null; }
    if (p23 === void 0) { p23 = null; }
    var match = new match_1.Match(player1, player2);
    match.player1Sets.push(p11);
    match.player1Sets.push(p12);
    if (p13) {
        match.player1Sets.push(p13);
    }
    match.player2Sets.push(p21);
    match.player2Sets.push(p22);
    if (p23) {
        match.player2Sets.push(p23);
    }
    match.finishMatch();
    return match;
}
testing_1.describe('Single match winner tests', function () {
    function testWinner(matchCollection, expectedWinner, description) {
        testing_1.it('expected player should be winner ' + description, function () {
            var matchService = new MatchService_1.MatchService();
            var winner = matchService.calculateWinner(matchCollection);
            testing_1.expect(winner.name).toBe(expectedWinner.name, expectedWinner.name + ' should be winner. ');
        });
    }
    var testCases = ['1,1,2,21,0,21,0', '2,2,1,21,0,21,0', '1,2,1,10,21,10,21', '2,1,2,0,21,0,21', '1,1,2,10,21,21,19,23,21'];
    p1 = { name: 'p1' };
    p2 = { name: 'p2' };
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var test = testCases_1[_i];
        var data = test.split(',').map(function (d) { return parseInt(d, 10); });
        var player = (data[0] === 1) ? p1 : p2;
        var player1 = (data[1] === 1) ? p1 : p2;
        var player2 = (data[2] === 1) ? p1 : p2;
        matches = new Array();
        matches.push(createMatch(player1, player2, data[3], data[4], data[5], data[6], data[7], data[8]));
        testWinner(matches, player, test);
    }
});
testing_1.describe('1. Vundne kampe', function () {
    sharedSetup();
    testing_1.it('One player wins all matches', function () {
        matches.push(createMatch(p1, p2, 21, 10, 21, 10));
        matches.push(createMatch(p1, p3, 21, 10, 10, 21, 21, 10));
        matches.push(createMatch(p2, p3, 21, 10, 21, 10));
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
    testing_1.it('One player wins most matches', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10));
        matches.push(createMatch(p2, p3, 21, 10, 21, 10));
        matches.push(createMatch(p1, p3, 21, 10, 21, 10));
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });
    testing_1.it('One player wins most matches #2', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10));
        matches.push(createMatch(p3, p2, 21, 10, 21, 10));
        matches.push(createMatch(p1, p3, 21, 10, 21, 10));
        matches.push(createMatch(p4, p1, 21, 10, 21, 10));
        matches.push(createMatch(p4, p2, 21, 10, 21, 10));
        matches.push(createMatch(p4, p3, 21, 10, 21, 10));
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p4.name, 'player4 should be winner');
    });
});
testing_1.describe('2. Indbyrdes kamp', function () {
    sharedSetup();
    testing_1.it('Two players both win two matches', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2
        matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
        matches.push(createMatch(p4, p1, 10, 21, 10, 21)); // p1
        matches.push(createMatch(p4, p2, 21, 10, 21, 10)); // p4
        matches.push(createMatch(p4, p3, 21, 10, 21, 10)); // p4
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
    testing_1.it('Two players both win two matches #2', function () {
        matches.push(createMatch(p4, p3, 21, 10, 21, 10)); // p4
        matches.push(createMatch(p4, p2, 21, 10, 21, 10)); // p4
        matches.push(createMatch(p4, p1, 10, 21, 10, 21)); // p1
        matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2
        matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
});
testing_1.describe('3. Difference i sæt.', function () {
    sharedSetup();
    testing_1.it('Two players both win two matches and equal set', function () {
        matches.push(createMatch(p2, p1, 21, 10, 10, 21, 21, 10)); // p2 -1 sæt, p1 +1 sæt
        matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
});
testing_1.describe('3. Difference i sæt. Indbyrdes kamp', function () {
    sharedSetup();
    testing_1.it('Two players both win two matches and equal sets. Mutually won match', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2 (mutual match)
        matches.push(createMatch(p2, p4, 21, 10, 21, 10)); // p2
        matches.push(createMatch(p2, p5, 21, 10, 21, 10)); // p2
        matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
        matches.push(createMatch(p3, p4, 21, 10, 10, 21, 21, 10)); // p3 ( -1 til p4)
        matches.push(createMatch(p3, p5, 21, 10, 21, 10)); // p3
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
        matches.push(createMatch(p1, p4, 21, 10, 21, 10)); // p1
        matches.push(createMatch(p1, p5, 21, 10, 21, 10)); // p1
        matches.push(createMatch(p4, p5, 21, 10, 21, 10)); // p4
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });
});
testing_1.describe('4. Difference i point', function () {
    sharedSetup();
    testing_1.it('One player most points', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2 
        matches.push(createMatch(p2, p3, 10, 21, 10, 21)); // p3
        matches.push(createMatch(p1, p3, 21, 15, 21, 7)); // p1
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p3.name, 'player3 should be winner');
    });
    testing_1.it('Two players both win two matches and equal sets and equal points. Mutually won match', function () {
        matches.push(createMatch(p2, p1, 21, 14, 21, 14)); // p2 (mutual match) (+14 p2, -14 p1)
        matches.push(createMatch(p2, p4, 21, 10, 21, 12)); // p2 (+ 20)
        matches.push(createMatch(p2, p5, 21, 10, 21, 10)); // p2 (+ 22)
        matches.push(createMatch(p3, p2, 24, 22, 22, 20)); // p3 (+6 p3, -4 p2)
        matches.push(createMatch(p3, p4, 21, 18, 21, 18)); // p3 (+6)
        matches.push(createMatch(p3, p5, 21, 18, 21, 18)); // p3 (+6)
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1 (+22)
        matches.push(createMatch(p1, p4, 21, 10, 21, 10)); // p1 (+22)
        matches.push(createMatch(p1, p5, 21, 10, 21, 10)); // p1 (+22)
        matches.push(createMatch(p4, p5, 21, 10, 21, 10)); // p4
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });
});
testing_1.describe('Draw', function () {
    sharedSetup();
    testing_1.it('All players equal match, sets, points. Winner by draw!', function () {
        matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2 
        matches.push(createMatch(p2, p3, 10, 21, 10, 21)); // p3
        matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
        var winner = sut.calculateWinner(matches);
        testing_1.expect(winner).toBe(null, 'Winner should be found by draw');
    });
});
//# sourceMappingURL=MatchService.spec.js.map