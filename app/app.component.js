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
var players_component_1 = require('./players.component');
var matches_component_1 = require('./matches.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.playersReady = function (players) {
        this.winner = null;
        console.log('playersReady in app', players);
        this.players = players;
    };
    AppComponent.prototype.winnerFound = function (winner) {
        this.winner = winner;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [players_component_1.PlayersComponent, matches_component_1.MatchesComponent],
            template: "<h1>Angular 2</h1>\n    <players (playersReady)=\"playersReady($event)\" *ngIf=\"!players\"></players>\n    <matches *ngIf=\"players\" [players]=players (winnerFound)=\"winnerFound($event)\"></matches>\n    <h3 *ngIf=\"winner\">{{ winner.name }} won!</h3>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map