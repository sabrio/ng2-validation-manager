var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ValidationManager } from "../../lib/validation-manager";
export var AppComponent = (function () {
    function AppComponent() {
        this.url = 'https://github.com/sabrio/ng2-validation-manager';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.form = new ValidationManager({
            'name': 'required|minLength:4|maxLength:12|alphaSpace',
            'name_alpha': 'required|minLength:4|maxLength:12|alpha',
            'username': 'required|minLength:4|maxLength:12|alphaNum',
            'age': 'required|number',
            'email': 'required|email',
            'date1': 'dateISO',
            'date2': 'required|minDate:2016-05-05',
            'integer': 'required|min:5',
            'password': 'required',
            'repassword': 'required|equalTo:password'
        });
        this.form.setValue({
            'name': 'Testing',
            'name_alpha': 'test',
        });
        this.form.setValue('password', 'blbla');
    };
    AppComponent.prototype.proced = function () {
        if (this.form.isValid()) {
            alert(1);
        }
    };
    AppComponent.prototype.goTo = function (location) {
        window.location.hash = location;
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/xampp/htdocs/ng2-validation-manager/src/src/app/app.component.js.map