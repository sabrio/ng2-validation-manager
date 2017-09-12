import { Component, OnInit } from '@angular/core';
import {ValidationManager} from "../../../lib/validation-manager";
import {FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  form;

  checkboxs = [
    {'name': 'check1'},
    {'name': 'check2'},
    {'name': 'check3'},
    {'name': 'check4'},
  ];
  radios = [
    {'name': 'radio1'},
    {'name': 'radio2'},
    {'name': 'radio3'},
    {'name': 'radio4'},
  ];

  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'email'       : 'required|email',
      'username'    : 'required|pattern:/[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*/',
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
      'checkboxs': [],
      'radios': ''
    });

    this.form.setValue({
      'name': 'Default',
      'username': 'myUserName',
      'description': 'description'
    });

    this.form.setErrorMessage('username', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');

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

  onCheck(value, isChecked){
    const checkboxArray = <FormArray>this.form.getControl('checkboxs');

    if(isChecked) {
      checkboxArray.push(new FormControl(value));
    } else {
      let index = checkboxArray.controls.findIndex(x => x.value == value)
      checkboxArray.removeAt(index);
    }
  }
}
