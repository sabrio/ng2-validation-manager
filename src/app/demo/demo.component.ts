import { Component, OnInit } from '@angular/core';
import {ValidationManager} from "../../../lib/validation-manager";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  form;

  checkboxs = [
    {'name': 'check1', 'checked': true},
    {'name': 'check2', 'checked': true},
    {'name': 'check3', 'checked': false},
    {'name': 'check4', 'checked': false},
    {'name': 'check5', 'checked': false}
  ];
  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'email'       : 'required|email',
      'username'    : 'required|pattern:[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*',
      'description' : {'rules': 'required|count:15', 'value': 'testing'},
      'password'    : 'required|rangeLength:8,50',
      'repassword'  : 'required|equalTo:password',
      'formGroup'       :  new ValidationManager({
        'id': {value: {value: 1, disabled: true}, rules: 'required'},
        'name': {value: 'Form group', rules: 'required|pattern:[A-Za-z0-9]+'}
      }),
      'addresses'   : [
        new ValidationManager({
          'street': 'required',
          'postcode': ''
        })
      ],
      'checkboxs': []
    });

    this.form.setValue({
      'name': 'Default',
      'username': 0,
      'description': 'description'
    });

    this.form.setErrorMessage('username', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');

    this.checkboxs.forEach((check, i) => {
      this.form.addChildGroup('checkboxs', check.checked);
    });
  }

  addAddress() {
    this.form.addChildGroup('addresses', new ValidationManager({'street': {value:'testing', rules: 'required'}, 'postcode': ''}) );
  }

  removeAddress(i: number) {
    this.form.removeChildGroup('addresses', i);
  }

  removeFormGroup(){
    this.form.removeChildGroup('formGroup');
  }

  save(){
    if(this.form.isValid()){
      alert('validation pass');
      console.log(this.form.getData());
      this.form.reset();
    }
  }

}
