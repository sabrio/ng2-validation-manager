
#ng2-validation-manager

      

<h2>
  Hello World!
</h2>



<p><strong>ng2-validation-manager</strong> is validation library for Angular 2 based on Laravel Validation method. </p>
<p><a href="https://sabrio.github.io/ng2-validation-manager">Demo</a></p>


<h3 id="dbyll-is-on-github">Main features</h3>
<ul class="feature-list">
<li>&#x2611; Easy setup</li>
  <li>&#x2611; Dynamic messages</li>
  <li>&#x2611; +20 validation rules</li>
  <li>&#x2610; Custom errors messages</li>
  <li>&#x2610; Multiple languages</li>
  <li>&#x2610; Expendable</li>
</ul>
  



##Install

 
<pre>
  <code>npm i ng2-validation-manager --save</code>
</pre>

###Import
    
	  @NgModule({
	    imports: [
	      ...
	      ReactiveFormsModule
	    ]
	  })
  
##Usage
  

  
	import {ValidationManager} from "ng2-validation-manager";
	
	export class AppComponent implements OnInit{
	
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
 

and your view would like like:

    <form [formGroup]="form.getForm()" (ngSubmit)="save()">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" formControlName="name">
        <div *ngIf="form.hasError('name')" class="alert alert-danger">
          {{form.getError('name')}}
        </div>
      </div>

	    <div class="form-group">
	      <label>Email</label>
	      <input type="text" class="form-control" formControlName="email">
	      <div *ngIf="form.hasError('email')" class="alert alert-danger">
	        {{form.getError('email')}}
	      </div>
	    </div>
	
	    <div class="form-group">
	      <label>Password</label>
	      <input type="password" class="form-control" formControlName="password">
	      <div *ngIf="form.hasError('password')" class="alert alert-danger">
	        {{form.getError('password')}}
	      </div>
	    </div>
	
	    <div class="form-group">
	      <label>RE-Password</label>
	      <input type="repassword" class="form-control" formControlName="repassword">
	      <div *ngIf="form.hasError('repassword')" class="alert alert-danger">
	        {{form.getError('repassword')}}
	      </div>
	    </div>
	    <button type="submit" class="btn btn-success">Submit</button>
    </form>
	
 
##Validation manager api
  
| Method| Return | Description |
|-------|--------|-------------|
| constructor(obj:{ field: rules }, ['invalid', 'dirty', 'submitted']) | | |
| getForm() | FormGroup | This method returns the FormGroup |
| isValid() | boolean | This method checks if the form is valid or not |
| reset() | void | This method resets the form  | 
| hasError(field) | boolean | This method checks if the form is valid or not | 
| getError(field) | string | This method returns the error of the field | 
| getErrors() | []:string | This method returns array of all errors | 
| setValue(field, value) | void | This method sets value of field | 
| getValue(field) | string | This method return the value of field | 


##Validators
  
The current validators/rules

<b>Note:</b> Validation rules are <b>case-sensitive</b></div>
  
<div class="col-md-4"><a href="#required">required</a></div>
<div class="col-md-4"><a href="#number">number</a></div>
<div class="col-md-4"><a href="#date">date</a></div>

<div class="col-md-4"><a href="#alpha">alpha</a></div>
<div class="col-md-4"><a href="#digits">digits</a></div>
<div class="col-md-4"><a href="#minDate">minDate</a></div>


<div class="col-md-4"><a href="#alphaNum">alphaNum</a></div>
<div class="col-md-4"><a href="#minLength">minLength</a></div>
<div class="col-md-4"><a href="#maxDate">maxDate</a></div>

<div class="col-md-4"><a href="#alphaSpace">alphaSpace</a></div>
<div class="col-md-4"><a href="#maxLength">maxLength</a></div>
<div class="col-md-4"><a href="#dateISO">dateISO</a></div>

<div class="col-md-4"><a href="#alphanNumSpace">alphaNumSpace</a></div>
<div class="col-md-4"><a href="#range">range</a></div>
<div class="col-md-4"><a href="#rangeLength">rangeLength</a></div>

<div class="col-md-4"><a href="#max">max</a></div>
<div class="col-md-4"><a href="#min">min</a></div>
<div class="col-md-4"><a href="#email">email</a></div>

<div class="col-md-4"><a href="#equal">equal</a></div>
<div class="col-md-4"><a href="#equalTo">equalTo</a></div>
  