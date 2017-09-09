
<h1>ng2-validation-manager</h1>

     



<p><strong>ng2-validation-manager</strong> is simple and flexible library for reactive form validation in angular 2+</p>
<p><a href="https://sabrio.github.io/ng2-validation-manager">Demo</a></p>


<h3 id="dbyll-is-on-github">Main features</h3>
<ul class="feature-list">
<li>&#x2611; Easy setup</li>
  <li>&#x2611; Dynamic messages</li>
  <li>&#x2611; +20 validation rules</li>
  <li>&#x2611; Custom errors messages</li>
  <li>&#x2611; Child FormGroup and FormArray</li>
  <li>&#x2610; Multiple languages</li>
  <li>&#x2610; Validator Expendable </li>
</ul>
  



<h2>Install</h2>

 
<pre>
  <code>npm i ng2-validation-manager --save</code>
</pre>

<h3>Import</h3>
    
	  @NgModule({
	    imports: [
	      ...
	      ReactiveFormsModule
	    ]
	  })
  
<h3>Usage</h3>
  

  
    import {ValidationManager} from "ng2-validation-manager";

    export class AppComponent implements OnInit{

      form;

      ngOnInit() {

        this.form = new ValidationManager({
          'name'        : 'required|minLength:4|maxLength:12|alphaSpace',
          'email'       : 'required|email',
          'username'    : 'required|pattern:[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*',
          'description' : {'rules': 'required|count:15', 'value': 'testing'},
          'password'    : 'required|rangeLength:8,50',
          'repassword'  : 'required|equalTo:password'
        });

        this.form.setValue({
          'name': 'Default'
        });

        this.form.setErrorMessage('username', 'pattern', 'Pattern must be part of this family: [A-Za-z0-9.-_]');
      }

      save(){
        if(this.form.isValid()){
          alert('validation pass');
          console.log(this.form.getData());
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
        <label>Username</label>
        <input type="text" class="form-control" formControlName="username">
        <div *ngIf="form.hasError('username')" class="alert alert-danger">
          {{form.getError('username')}}
        </div>
      </div>

      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" formControlName="description">
        <div *ngIf="form.hasError('description')" class="alert alert-danger">
          {{form.getError('description')}}
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
	
 
<h2>Validation manager api</h2>
  

| Method| Return           | Description |
|-------|------------------|-----------------------------------------------------|
| constructor(obj:{ field: rules }, ['invalid', 'dirty', 'submitted']) | | |
| getForm() | FormGroup | This method returns the FormGroup |
| isValid() | boolean | This method checks if the form is valid or not |
| reset() | void | This method resets the form  | 
| hasError(field) | boolean | This method checks if the form field is valid or not | 
| getError(field) | string | This method returns the error of the field | 
| getErrors() | []:string | This method returns array of errors | 
| setErrorMessage(field, rule, message) | void | This method can change the defualt message of a particular rule  | 
| setValue(field, value) | void | This method sets value of field | 
| getValue(field) | string | This method returns the value of field |
| getDate() | [] => {field:value} | This method returns array of pair key and value of your form  | 
| getChildGroup(groupName:string, [index:number = null]) | [] => {field:value} | This method returns child FormGroup or FormArray | 
| addChildGroup(field, mgr: ValidationManager) | [] => {field:value} |   | 
| removeChildGroup(groupName:string, [index:number = null]) | [] => {field:value} | This method returns array of pair key and value of your form  | 

<h2>Validators</h2>
  
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


<div class="col-md-4"><a href="#equalTo">pattern</a></div>
<div class="col-md-4"><a href="#equalTo">count</a></div>

  
