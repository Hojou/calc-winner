import {Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({
    selector: 'players',
    template: `
        <div *ngFor="let player of players">{{ player.name }}&nbsp;<button type="button" (click)="removePlayer(player)">X</button></div>
        <div><input #newPlayer type="text" (keyup.enter)="addPlayer(newPlayer.value)"><button type="button" 
        (click)="addPlayer(newPlayer.value)">ADD</button></div>
        <div><button type="button" (click)="createMatches()">GO</button></div>
    `
})
export class PlayersComponent implements AfterViewInit {
    players: Array<any> = new Array<any>();
    @ViewChild('newPlayer') inputElement: ElementRef;
    @Output() playersReady: EventEmitter<any> = new EventEmitter<any>();

    ngAfterViewInit()  {
        this.inputElement.nativeElement.focus();
    }

    public addPlayer(name: string) {
        if (!name.length) {
            this.createMatches();
            return;
        };

        this.players.push({ name: name});
        this.inputElement.nativeElement.value = '';
        this.inputElement.nativeElement.focus();
    }

    public removePlayer(player: any) {
        console.log('player remove', player);
        let index = this.players.indexOf(player);
        if (index !== undefined) {
            this.players.splice(index, 1);
        }
        this.inputElement.nativeElement.focus();
    }

    public createMatches() {
        if (this.players.length < 3) { return; }
        this.playersReady.next(this.players);
    }
}
