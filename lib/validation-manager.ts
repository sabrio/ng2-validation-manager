import {FormGroup, FormControl, FormArray, FormBuilder, ValidatorFn, AbstractControl} from "@angular/forms";
import {Validators} from "./validators";


export class ValidationManager {

  private controls = {};

  formGroup: FormGroup;
  errors = {};
  submitted = false;
  children = {};

  private _fb: FormBuilder;

  constructor(formValidations : String|Object|Array<ValidationManager>|ValidationManager,
              private displayError : Array<String> = ['invalid', 'dirty', 'submitted']) {
    this.formGroup = new FormGroup({});
    this._fb = new FormBuilder();
    for(const key in formValidations) {

      if(typeof formValidations[key] == 'string'){
        this.controls[key] = this.buildControl(key, formValidations[key]);
      }else if (formValidations[key] instanceof ValidationManager) {
        this.children[key] = formValidations[key];
        this.controls[key] = {control: formValidations[key].getForm(), messages: {}};
      }else if (formValidations[key] instanceof Array){
        this.children[key] = [];
        let formArray = <FormArray>this._fb.array([]);

        for(let group of formValidations[key]){
          formArray.push(group.getForm());
          this.children[key].push(group);
        }
        this.controls[key] = {control: formArray, messages: {}};
      }else if (typeof formValidations[key] == 'object'){
        if(!formValidations[key].value)
          formValidations[key].value = '';
        this.controls[key] = this.buildControl(key, formValidations[key].rules, formValidations[key].value);
      }

      this.formGroup.addControl(key, this.controls[key].control);

      this.errors[key] = '';
    }

    this.formGroup.valueChanges.subscribe(data => this.onValueChanged());
  }

  getForm() {
    return this.formGroup;
  }

  getChildGroup(field, index: number = null) {
    if(index !== null)
      return this.children[field][index];
    return this.children[field];
  }

  getChildren(field) {
    return this.children[field];
  }

  addChildGroup(field, mgr: ValidationManager) {
    if(this.formGroup.controls[field] && this.formGroup.controls[field] instanceof FormArray){
      const control = <FormArray>this.formGroup.controls[field];
      control.push(mgr.getForm());
      this.children[field].push(mgr);
      return control.length - 1;
    }else{
      this.children[field] = mgr;
      this.formGroup.addControl(field, mgr.getForm());
      return -1;
    }
  }

  removeChildGroup(field, index: number = null) {
    if (!this.formGroup.controls[field]) {
      return;
    }

    if(index !== null){
      const control = <FormArray>this.formGroup.controls[field];
      control.removeAt(index);
      this.children[field].splice(index, 1);
    }else{
      this.formGroup.removeControl(field);
      delete this.children[field];
    }
  }

  isValid() {
    this.submitted = true;
    this.__setOnChild('submitted', true);
    this.onValueChanged();
    return !this.formGroup.invalid;
  }

  hasError(field) {
    return this.errors[field] ? true : false;
  }

  getError(field) {
    return this.errors[field];
  }

  getErrors() {
    for(const child in this.children){
      if(this.children[child] instanceof Array){
        this.errors[child] = {};
        for(const subChild in this.children[child])
          this.errors[child][subChild] = this.children[child][subChild].errors;
      }else
        this.errors[child] = this.children[child].errors;
    }
    return this.errors;
  }

  reset() {
    this.submitted = false;
    this.formGroup.reset();
    this.__setOnChild('submitted', false);
    for (const fld in this.children) {
      for (const child of this.children[fld]) {
        child.formGroup.reset();
      }
    }
  }

  onValueChanged(displayError = null) {
    if (!this.formGroup) {
      return;
    }

    const form = this.formGroup;
    for (const field in this.errors) {
      const control = form.get(field);
      this.errors[field] = '';

      if (displayError == null)
        displayError = this.displayError;

      if (control && displayError.length && (displayError.every(element => {
          return (element == "submitted") ? true : control[element]
        }) || this.submitted)) {
        for (let rule in control.errors) {
          this.errors[field] = this.getErrorMessage(field, rule);
        }
      }
    }

    this.__callOnChild('onValueChanged');
  }

  setValue(values: Object|String, value = null) {

    if (typeof values == "string") {
      const control = this.formGroup.get(values);
      if (!control || control instanceof FormArray) {
        return;
      }

      if (value !== null) {
        this.formGroup.get(values).setValue(value.toString());
        this.formGroup.get(values).markAsTouched();
        this.formGroup.get(values).markAsDirty();
      }
    }

    if (typeof values == "object") {
      for (let key in values) {
        if (this.formGroup.get(key)) {
          this.setValue(key, values[key]);
        }
      }
    }
  }

  getValue(controlKey: string) {
    return this.formGroup.value[controlKey];
  }

  getData() {
    return this.formGroup.value;
  }

  getControl(controlName:string):AbstractControl{
    if(!this.formGroup.controls[controlName])
      return;
    return this.formGroup.controls[controlName];
  }

  buildControl(name:string, rules:string, value:string|Object = null) {

    var controlRules: ValidatorFn[] = [];
    var messages = {};

    rules.split('|').forEach(rule => {
      if (rule) {
        var rule_spilted = rule.split(':');
        var rule_name = rule_spilted[0];

        var rule_vars = [];
        if (rule_spilted[1])
          rule_vars = rule_spilted[1].split(',');

        if (!Validators[rule_name])
          throw new TypeError('Validation rule [' + rule_name + '] does not exists.');

        if (rule_vars.length > 1)
          controlRules.push(Validators[rule_name](rule_vars));
        else if (rule_vars.length == 1)
          controlRules.push(Validators[rule_name](rule_vars[0]));
        else
          controlRules.push(Validators[rule_name]);

        messages[rule_name.toLowerCase()] = this.buildMessage(name, rule_name, rule_vars);
      }

    });

    var formControl = new FormControl(value, controlRules);

    return {control: formControl, messages: messages};
  }

  private getErrorMessage(field, rule) {
    //console.log('Message: '+this.controls[field].messages[rule.toLowerCase()] + ' Field:' + field + ' rule:'+ rule);
    if (!this.controls[field].messages[rule.toLowerCase()])
      throw Error('Message not found inside the control:' + field + ' message:' + rule.toLowerCase());
    return this.controls[field].messages[rule.toLowerCase()];
  }

  setErrorMessage(field, rule, message) {
    if (this.controls[field].messages[rule.toLowerCase()])
      this.controls[field].messages[rule.toLowerCase()] = message;
  }

  private buildMessage(name, rule, arg = []) {
    if (!this.getMessage(rule))
      throw Error('Validation message is missing for: ' + rule);

    var message = this.getMessage(rule);
    message = message.replace(/%n/g, ucFirst(name)).replace('_', ' ');

    if (arg.length) {
      arg.forEach((arg, key) => {
        message = message.replace('%' + key, arg);
      });
    }

    return message;
  }

  private getMessage(rule) {
    return VALIDATION_MESSAGES[rule.toLowerCase()];
  }

  private __callOnChild(funct) {
    for (const fld in this.children) {
      if(this.children[fld] instanceof Array){
        for (const child of this.children[fld]) {
          child[funct].apply(child, Array.prototype.slice.call(arguments, 1));
        }
      }else{
        this.children[fld][funct].apply(this.children[fld], Array.prototype.slice.call(arguments, 1));
      }

    }
  }

  private __setOnChild(field, value) {
    for (const fld in this.children) {
      if(this.children[fld] instanceof Array){
        for (const child of this.children[fld]) {
          child[field] = value;
        }
      }else{
        this.children[fld][field] = value;
      }


    }
  }

}


//keys must be with lowercase
export const VALIDATION_MESSAGES = {
  'required': '%n is required',
  'minlength': '%n must be at least %0 characters long.',
  'maxlength': '%n cannot be more than %0 characters long.',
  'alpha': '%n accepts only alphabetic characters.',
  'alphaspace': '%n accepts only alphabetic characters and space.',
  'alphanum': '%n accepts only alphabetic characters and numbers.',
  'alphanumspace': '%n accepts only alphabetic characters, numbers and space.',
  'url': '%n is not valid url.',
  'number': '%n is not valid number.',
  'digits': '%n is not valid number.',
  'creditcard': '%n is not valid credit card.',
  'range': '%n must be between %0 and %1.',
  'rangelength': '%n must be between %0 and %1.',
  'max': '%n must be equal or lower then %0',
  'min': '%n must be equal or higher then %0',
  'email': '%n is not valid email.',
  'date': '%n is not valid date.',
  'mindate': 'The minimum date allowed in %n is %0',
  'maxdate': 'The maximum date allowed in %n is %0',
  'dateiso': '%n is not valid ISO date[yyyy-mm-dd].',
  'equal': '%n should be equal to %0',
  'equalto': '%n must be equal to %0',
  'json': '%n is not valid json.',
  'pattern': '%n does not match the pattern.',
  'count': '%n must count %0'
};

function ucFirst(str) {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}
