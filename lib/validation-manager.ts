import {FormGroup, FormControl, ValidatorFn} from "@angular/forms";
import {Validators} from "./validators";


export class ValidationManager{

  private controls = {};

  formGroup:FormGroup;
  formControls = {};
  errors = {};
  submitted = false;

  constructor(
    private inputsRaw,
    private displayError = ['invalid', 'dirty', 'submitted']
  ){

    for(var key in this.inputsRaw){
      this.controls[key] = this.buildControl(key, this.inputsRaw[key]);
      this.formControls[key] = this.controls[key].control;
      this.errors[key] = '';
    }

    this.formGroup = new FormGroup(this.formControls);

    this.formGroup.valueChanges.subscribe(data => this.onValueChanged());
  }

  getForm(){
    return this.formGroup;
  }

  isValid(){
    this.submitted = true;
    this.onValueChanged();
    return !this.formGroup.invalid;
  }

  hasError(field){
    return this.errors[field] ? true : false;
  }

  getError(field){
    return this.errors[field];
  }

  getErrors(){
    return this.errors;
  }

  reset(){
    this.submitted = false;
    this.formGroup.reset();
  }

  onValueChanged(displayError = null) {
    if (!this.formGroup) { return; }

    const form = this.formGroup;
    for (const field in this.errors) {
      const control = form.get(field);
      this.errors[field] = '';

      if(displayError == null)
        displayError = this.displayError;

      if (control && displayError.length && (displayError.every(element => {return (element == "submitted") ? true : control[element]}) || this.submitted)) {
        for (let rule in control.errors) {
          this.errors[field] = this.getErrorMessage(field, rule);
        }
      }
    }
  }

  setValue(values:any, value = null){

    if(typeof values == "string"){
      this.formGroup.controls[values].setValue(value);
    }

    if(typeof values == "object"){
      for(let key in values){
        this.formGroup.controls[key].setValue(values[key]);
      }
    }
  }

  getValue(controlKey:string){
    return this.formGroup.controls[controlKey].value;
  }

  buildControl(name, rules){
    rules = rules.split('|');
    var controlRules:ValidatorFn[] = [];
    var messages = {};


    rules.forEach(rule => {
      if(rule){
        var rule_spilted    = rule.split(':');
        var rule_name       = rule_spilted[0];

        var rule_vars = [];
        if(rule_spilted[1])
          rule_vars = rule_spilted[1].split(',');

        if(!Validators[rule_name])
          throw new TypeError('Validation rule ['+rule_name+'] does not exists.');

        if(rule_vars.length > 1)
          controlRules.push(Validators[rule_name](rule_vars));
        else if(rule_vars.length == 1)
          controlRules.push(Validators[rule_name](rule_vars[0]));
        else
          controlRules.push(Validators[rule_name]);

        messages[rule_name.toLowerCase()]  = this.buildMessage(name, rule_name, rule_vars);
      }

    });

    return { control : new FormControl('', controlRules), messages: messages};
  }

  private getErrorMessage(field, rule){
    //console.log('Message: '+this.controls[field].messages[rule.toLowerCase()] + ' Field:' + field + ' rule:'+ rule);
    if(!this.controls[field].messages[rule.toLowerCase()])
      throw Error('Message not found inside the control:' + field + ' message:' + rule.toLowerCase());
    return this.controls[field].messages[rule.toLowerCase()];
  }

  private buildMessage(name, rule, arg = []){
    if(!this.getMessage(rule))
      throw Error('Validation message is missing for: ' + rule);

    var message = this.getMessage(rule);
    message = message.replace(/%n/g, ucFirst(name)).replace('_', ' ');

    if(arg.length){
      arg.forEach((arg, key) => {
        message = message.replace('%'+key, arg);
      });
    }

    return message;
  }

  getMessage(rule){
    return VALIDATION_MESSAGES[rule.toLowerCase()];
  }

}


//keys must be with lowercase
export const VALIDATION_MESSAGES = {
  'required'          : '%n is required',
  'minlength'         : '%n must be at least %0 characters long.',
  'maxlength'         : '%n cannot be more than %0 characters long.',
  'alpha'             : '%n accepts only alphabetic characters.',
  'alphaspace'        : '%n accepts only alphabetic characters and space.',
  'alphanum'          : '%n accepts only alphabetic characters and numbers.',
  'alphanumspace'     : '%n accepts only alphabetic characters, numbers and space.',
  'url'               : '%n is not valid url.',
  'number'            : '%n is not valid number.',
  'digits'            : '%n is not valid number.',
  'creditcard'        : '%n is not valid credit card.',
  'range'             : '%n must be between %0 and %1.',
  'rangelength'       : '%n must be between %0 and %1.',
  'max'               : '%n must be equal or lower then %0',
  'min'               : '%n must be equal or higher then %0',
  'email'             : '%n is not valid email.',
  'date'              : '%n is not valid date.',
  'mindate'           : 'The minimum date allowed in %n is %0',
  'maxdate'           : 'The maximum date allowed in %n is %0',
  'dateiso'           : '%n is not valid ISO date[yyyy-mm-dd].',
  'equal'             : '%n should be equal to %0',
  'equalto'           : '%n must be equal to %0',
  'json'              : '%n is not valid json.'
};

function ucFirst(str) {
  var firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}