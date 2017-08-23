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
  slider = null;

  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'email'       : 'required|email',
      'username'    : 'required|pattern:[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*',
      'description' : {'rules': 'required|count:15', 'value': 'testing'},
      'password'    : 'required|rangeLength:8,50',
      'repassword'  : 'required|equalTo:password',
      'addresses'   : 'formgroup'
    });

    this.form.setValue({
      'name': 'Default',
      'username':0
    });


    this.form.setErrorMessage('username', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');
    this.form.addChild('addresses', new ValidationManager({'street': 'required', 'postcode': ''}) );

  }

  addAddress() {
    this.form.addChild('addresses', new ValidationManager({'street': 'required', 'postcode': ''}) );
  }

  removeAddress(i: number) {
    this.form.removeChild('addresses', i);
  }

  save(){
    if(this.form.isValid()){
      alert('validation pass');
      console.log(this.form.getData());
      this.form.reset();
    }
  }

}
