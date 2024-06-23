import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordPattern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,15}/ 

export const phonoContactoPattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/

export const passwordMatch: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {

    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');
    return password?.value !== passwordRepeat?.value ? {passwordMatch: true} : null;
  };