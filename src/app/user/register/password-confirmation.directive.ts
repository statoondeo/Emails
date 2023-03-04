import { Directive } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector:
    '[ngForm][password-confirmation],[ngModelGroup][password-confirmation],[formGroup][password-confirmation],[formGroupName][password-confirmation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordConfirmationValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordConfirmationValidatorDirective implements Validator {
  validate(
    control: AbstractControl<{
      password: FormControl<string>;
      confirm: FormControl<string>;
    }>
  ): ValidationErrors | null {
    return PasswordConfirmationValidator(control);
  }
}
const PasswordConfirmationValidator: ValidatorFn = (
  control: AbstractControl<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>
) => {
  if (control.get('password')?.value === control.get('confirm')?.value)
    return null;
  control.get('confirm')?.setErrors({ confirm: true });
  return { confirm: true };
};
