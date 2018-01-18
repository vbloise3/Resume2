"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by vincebloise on 1/19/17.
 */
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/empty');
var Observable_1 = require("rxjs/Observable");
var HomeComponent = (function () {
    function HomeComponent(http, route) {
        var _this = this;
        this.http = http;
        this.products = this.http.get('/products')
            .map(function (res) { return res.json(); })
            .catch(function (err) {
            _this.errorMessage = "Can't get product details from " + err.url + ", error " + err.status + " ";
            return Observable_1.Observable.empty();
        });
        this.productId = route.snapshot.params['id'];
        this.randomness = this.getRandomNumber();
    }
    HomeComponent.prototype.getRandomNumber = function () {
        return Math.random();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'http-client',
            templateUrl: 'app/home/home.html',
            styleUrls: ['app/home/home.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], HomeComponent);
    return HomeComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeComponent;
