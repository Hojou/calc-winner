/* tslint:disable:no-unused-variable */
import { MatchService } from './MatchService';
import {Match} from './match';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';

import { By }             from '@angular/platform-browser';
import { provide }        from '@angular/core';
import { ViewMetadata }   from '@angular/core';
import { PromiseWrapper } from '@angular/core/src/facade/promise';

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

let p1: any;
let p2: any;
let p3: any;
let p4: any;
let p5: any;
let sut: MatchService;
let matches: Array<Match>;

function sharedSetup() {
  beforeEach(() => {
    p1 = { name: 'p1' };
    p2 = { name: 'p2' };
    p3 = { name: 'p3' };
    p4 = { name: 'p4' };
    p5 = { name: 'p5' };
    sut = new MatchService();
    matches = new Array<Match>();
  });

  afterEach(() => {
    sut = null;
    matches = null;
  });
}

function createMatch(player1: any, player2: any,
                    p11: number, p21: number, p12: number, p22: number, p13: number = null, p23: number = null) {

  let match = new Match(player1, player2);
  match.player1Sets.push(p11);
  match.player1Sets.push(p12);
  if (p13) { match.player1Sets.push(p13); }
  match.player2Sets.push(p21);
  match.player2Sets.push(p22);
  if (p23) { match.player2Sets.push(p23); }
  match.finishMatch();

  return match;
}

describe('Single match winner tests', function () {

  function testWinner(matchCollection: Array<Match>, expectedWinner: any, description: string) {
    it('expected player should be winner ' + description, () => {
      let matchService = new MatchService();
      let winner = matchService.calculateWinner(matchCollection);
      expect(winner.name).toBe(expectedWinner.name, expectedWinner.name + ' should be winner. ');
    });
  }

  let testCases = ['1,1,2,21,0,21,0', '2,2,1,21,0,21,0', '1,2,1,10,21,10,21', '2,1,2,0,21,0,21', '1,1,2,10,21,21,19,23,21'];
  p1 = { name: 'p1' };
  p2 = { name: 'p2' };

  for (let test of testCases) {
    let data = test.split(',').map((d) => parseInt(d, 10));
    let player = (data[0] === 1) ? p1 : p2;
    let player1 = (data[1] === 1) ? p1 : p2;
    let player2 = (data[2] === 1) ? p1 : p2;

    matches = new Array<Match>();
    matches.push(createMatch(player1, player2, data[3], data[4], data[5], data[6], data[7], data[8]));

    testWinner(matches, player, test);
  }
});

describe('1. Vundne kampe', function () {
    sharedSetup();

    it('One player wins all matches', () => {
      matches.push(createMatch(p1, p2, 21, 10, 21, 10));
      matches.push(createMatch(p1, p3, 21, 10, 10, 21, 21, 10));
      matches.push(createMatch(p2, p3, 21, 10, 21, 10));

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });

    it('One player wins most matches', () => {
      matches.push(createMatch(p2, p1, 21, 10, 21, 10));
      matches.push(createMatch(p2, p3, 21, 10, 21, 10));
      matches.push(createMatch(p1, p3, 21, 10, 21, 10));

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });

    it('One player wins most matches #2', () => {
      matches.push(createMatch(p2, p1, 21, 10, 21, 10));
      matches.push(createMatch(p3, p2, 21, 10, 21, 10));
      matches.push(createMatch(p1, p3, 21, 10, 21, 10));
      matches.push(createMatch(p4, p1, 21, 10, 21, 10));
      matches.push(createMatch(p4, p2, 21, 10, 21, 10));
      matches.push(createMatch(p4, p3, 21, 10, 21, 10));

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p4.name, 'player4 should be winner');
    });
});

describe('2. Indbyrdes kamp', function () {
    sharedSetup();

    it('Two players both win two matches', () => {
      matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2
      matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
      matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1
      matches.push(createMatch(p4, p1, 10, 21, 10, 21)); // p1
      matches.push(createMatch(p4, p2, 21, 10, 21, 10)); // p4
      matches.push(createMatch(p4, p3, 21, 10, 21, 10)); // p4

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });

    it('Two players both win two matches #2', () => {
      matches.push(createMatch(p4, p3, 21, 10, 21, 10)); // p4
      matches.push(createMatch(p4, p2, 21, 10, 21, 10)); // p4
      matches.push(createMatch(p4, p1, 10, 21, 10, 21)); // p1
      matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2
      matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
      matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
});

describe('3. Difference i sæt.', function () {
    sharedSetup();

    it('Two players both win two matches and equal set', () => {
      matches.push(createMatch(p2, p1, 21, 10, 10, 21, 21, 10)); // p2 -1 sæt, p1 +1 sæt
      matches.push(createMatch(p3, p2, 21, 10, 21, 10)); // p3
      matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p1.name, 'player1 should be winner');
    });
});

describe('3. Difference i sæt. Indbyrdes kamp', function () {
    sharedSetup();

    it('Two players both win two matches and equal sets. Mutually won match', () => {
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

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });
});

describe('4. Difference i point', function () {
    sharedSetup();

    it('One player most points', () => {
      matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2 
      matches.push(createMatch(p2, p3, 10, 21, 10, 21)); // p3
      matches.push(createMatch(p1, p3, 21, 15, 21, 7)); // p1

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p3.name, 'player3 should be winner');
    });

    it('Two players both win two matches and equal sets and equal points. Mutually won match', () => {
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

      let winner = sut.calculateWinner(matches);
      expect(winner.name).toBe(p2.name, 'player2 should be winner');
    });
});

describe('Draw', function () {
    sharedSetup();

    it('All players equal match, sets, points. Winner by draw!', () => {
      matches.push(createMatch(p2, p1, 21, 10, 21, 10)); // p2 
      matches.push(createMatch(p2, p3, 10, 21, 10, 21)); // p3
      matches.push(createMatch(p1, p3, 21, 10, 21, 10)); // p1

      let winner = sut.calculateWinner(matches);
      expect(winner).toBe(null, 'Winner should be found by draw');
    });
});
