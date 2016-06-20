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
var match_1 = require('./match');
var MatchService_1 = require('./MatchService');
var MatchesComponent = (function () {
    function MatchesComponent(matchService) {
        this.matchService = matchService;
        this.winnerFound = new core_1.EventEmitter();
    }
    MatchesComponent.prototype.ngOnChanges = function (changes) {
        this.matches = new Array();
        for (var i = 0; i < this.players.length; i++) {
            for (var l = i + 1; l < this.players.length; l++) {
                this.matches.push(new match_1.Match(this.players[i], this.players[l]));
            }
        }
    };
    MatchesComponent.prototype.calculateWinner = function () {
        this.matches.forEach(function (m) { return m.finishMatch(); });
        var winner = this.matchService.calculateWinner(this.matches);
        this.winnerFound.next(winner);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MatchesComponent.prototype, "players", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MatchesComponent.prototype, "winnerFound", void 0);
    MatchesComponent = __decorate([
        core_1.Component({
            selector: 'matches',
            templateUrl: 'app/matches.html',
            styles: ["\n        input { width: 50px; } \n        col { border: 1px solid #888; } \n        th { border-bottom: 1px solid #888; } \n        table { border-collapse:collapse; }\n    "],
            providers: [MatchService_1.MatchService]
        }), 
        __metadata('design:paramtypes', [MatchService_1.MatchService])
    ], MatchesComponent);
    return MatchesComponent;
}());
exports.MatchesComponent = MatchesComponent;
//# sourceMappingURL=matches.component.js.map