[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/preboot/angular-library-seed/status.svg)](https://david-dm.org/preboot/angular-library-seed#info=dependencies) [![devDependency Status](https://david-dm.org/preboot/angular-library-seed/dev-status.svg)](https://david-dm.org/preboot/angular-library-seed#info=devDependencies)

# ng2-validation-manager
Validation manager library for Angular 2 (based on Laravel Validation method)

## Installation


```bash
$ npm i ng2-validator-manager
```

## Dependecies
Import ReactiveFormsModule inside your module
```
	// ...
  
  @NgModule({
    imports: [
      // ...
      ReactiveFormsModule,
      // ...
    ],
    
  })
  // ...
```


#### Quick in ng2-validation-manager

```
..
import {ValidationManager} from "ng2-validation-manager";


export class AppComponent implements OnInit{

  form;

  ngOnInit() {

    this.form = new ValidationManager({
      'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
      'email'       : 'required|email',
      'password'    : 'required|rangeLength:8,50',
      'repassword'  : 'equalTo:password',
			}, ['invalid', 'submitted']);
		
		this.form.setValue({
      'name': 'Default',
    });
    //or
    this.form.setValue('name', 'Default');
	}
	
	save(){
    if(this.form.isValid()){
      alert('validation pass');
    }
  }
}
	
```
and the view would like like
```
<form [formGroup]="form.getForm()" (ngSubmit)="save()">
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" formControlName="name">
    <div *ngIf="form.hasError('name')" class="alert alert-danger">
      {{ form.getError('name') }}
    </div>
  </div>

  <div class="form-group">
    <label>Email</label>
    <input type="text" class="form-control" formControlName="email">
    <div *ngIf="form.hasError('email')" class="alert alert-danger">
      {{ form.getError('email') }}
    </div>
  </div>

  <div class="form-group">
    <label>Password</label>
    <input type="password" class="form-control" formControlName="password">
    <div *ngIf="form.hasError('password')" class="alert alert-danger">
      {{ form.getError('password') }}
    </div>
  </div>
  
  <div class="form-group">
    <label>RE-Password</label>
    <input type="repassword" class="form-control" formControlName="repassword">
    <div *ngIf="form.hasError('repassword')" class="alert alert-danger">
      {{ form.getError('repassword') }}
    </div>
  </div>
  <button type="submit">Sign in</button>
</form>
```

Dats it :) Hope you like it
### License

[MIT](/LICENSE)
