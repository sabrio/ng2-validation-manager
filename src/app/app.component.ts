import {Component, OnInit} from '@angular/core';

import { ValidationManager } from '../../lib/validation-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  form;

  constructor() {
  }

  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'name_alpha'  : 'required|minLength:4|maxLength:12|alpha',
      'username'    : 'required|minLength:4|maxLength:12|alphaNum',
      'age' : 'required|number',
      'email': 'required|email',
      'date1': 'dateISO',
      'date2': 'required|minDate:2016-05-05',
      'integer': 'required|min:5',
      'password': 'required',
      'repassword': 'required|equalTo:password',
      'addresses': 'formgroup'
    });

    this.form.setValue(
      {
        'name': 'Testing',
        'name_alpha': 'test',
      });
    this.form.setValue('password', 'blbla');
  }


  proced(){


    if(this.form.isValid()){
      alert(1);
    }
  }

  goTo(location: string): void {
    window.location.hash = location;
  }

  url: string = 'https://github.com/sabrio/ng2-validation-manager';
}

export interface Address {
  street: string;
  postcode: string;
}
