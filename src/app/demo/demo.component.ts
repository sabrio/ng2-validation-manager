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

  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'email'       : 'required|email',
      'password'    : 'required|rangeLength:8,50',
      'repassword'  : 'required|equalTo:password'
    });

    this.form.setValue('name', 'Default');
  }

  save(){
    if(this.form.isValid()){
      alert('validation pass');
      this.form.reset();
    }
  }

}
