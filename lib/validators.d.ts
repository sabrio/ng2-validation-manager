/// <reference types="core-js" />
import { ValidatorFn, AbstractControl, Validators as NativeValidators } from '@angular/forms';
export declare class Validators extends NativeValidators {
    /*** CUSTOM VALIDATIONS ***/
    /**
     * Validator that requires controls to have a value of a range length.
     */
    static alpha(control: AbstractControl): {
        [key: string]: boolean;
    };
    static alphaSpace(control: AbstractControl): {
        [key: string]: boolean;
    };
    static alphaNum(control: AbstractControl): {
        [key: string]: boolean;
    };
    static alphaNumSpace(control: AbstractControl): {
        [key: string]: boolean;
    };
    static requiredIfSet(field: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value of a range length.
     */
    static rangeLength(rangeLength: Array<number>): ValidatorFn;
    /**
     * Validator that requires controls to have a value of a min value.
     */
    static min(min: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value of a max value.
     */
    static max(max: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value of a range value.
     */
    static range(range: Array<number>): ValidatorFn;
    /**
     * Validator that requires controls to have a value of digits.
     */
    static digits(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of number.
     */
    static number(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of url.
     */
    static url(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of email.
     */
    static email(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of date.
     */
    static date(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of minDate.
     */
    static minDate(minDate: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value of maxDate.
     */
    static maxDate(maxDate: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value of dateISO.
     */
    static dateISO(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of creditCard.
     */
    static creditCard(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of JSON.
     */
    static json(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of base64.
     */
    static base64(control: AbstractControl): {
        [key: string]: boolean;
    };
    /**
     * Validator that requires controls to have a value of phone.
     */
    static phone(locale?: string): ValidatorFn;
    /**
     * Validator that requires controls to have a value of uuid.
     */
    static uuid(version?: string): ValidatorFn;
    /**
     * Validator that requires controls to have a value to equal another value.
     */
    static equal(val: any): ValidatorFn;
    /**
     * Validator that requires controls to have a value to equal another control.
     */
    static equalTo(equalControlName: any): ValidatorFn;
}
export declare function isPresent(obj: any): boolean;
export declare function isDate(obj: any): boolean;
