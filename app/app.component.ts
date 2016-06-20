import {Component} from '@angular/core';
import {PlayersComponent} from './players.component';
import {MatchesComponent} from './matches.component';

@Component({
    selector: 'my-app',
    directives: [PlayersComponent, MatchesComponent],
    template: `<h1>Angular 2</h1>
    <players (playersReady)="playersReady($event)" *ngIf="!players"></players>
    <matches *ngIf="players" [players]=players (winnerFound)="winnerFound($event)"></matches>
    <h3 *ngIf="winner">{{ winner.name }} won!</h3>
    `
})
export class AppComponent {
    players: Array<any>;
    winner: any;

    playersReady(players: Array<any>) {
        this.winner = null;
        console.log('playersReady in app', players);
        this.players = players;
    }

    winnerFound(winner: any) {
        this.winner = winner;
    }
}
