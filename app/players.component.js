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
var PlayersComponent = (function () {
    function PlayersComponent() {
        this.players = new Array();
        this.playersReady = new core_1.EventEmitter();
    }
    PlayersComponent.prototype.ngAfterViewInit = function () {
        this.inputElement.nativeElement.focus();
    };
    PlayersComponent.prototype.addPlayer = function (name) {
        if (!name.length) {
            this.createMatches();
            return;
        }
        ;
        this.players.push({ name: name });
        this.inputElement.nativeElement.value = '';
        this.inputElement.nativeElement.focus();
    };
    PlayersComponent.prototype.removePlayer = function (player) {
        console.log('player remove', player);
        var index = this.players.indexOf(player);
        if (index !== undefined) {
            this.players.splice(index, 1);
        }
        this.inputElement.nativeElement.focus();
    };
    PlayersComponent.prototype.createMatches = function () {
        if (this.players.length < 3) {
            return;
        }
        this.playersReady.next(this.players);
    };
    __decorate([
        core_1.ViewChild('newPlayer'), 
        __metadata('design:type', core_1.ElementRef)
    ], PlayersComponent.prototype, "inputElement", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PlayersComponent.prototype, "playersReady", void 0);
    PlayersComponent = __decorate([
        core_1.Component({
            selector: 'players',
            template: "\n        <div *ngFor=\"let player of players\">{{ player.name }}&nbsp;<button type=\"button\" (click)=\"removePlayer(player)\">X</button></div>\n        <div><input #newPlayer type=\"text\" (keyup.enter)=\"addPlayer(newPlayer.value)\"><button type=\"button\" \n        (click)=\"addPlayer(newPlayer.value)\">ADD</button></div>\n        <div><button type=\"button\" (click)=\"createMatches()\">GO</button></div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], PlayersComponent);
    return PlayersComponent;
}());
exports.PlayersComponent = PlayersComponent;
//# sourceMappingURL=players.component.js.map