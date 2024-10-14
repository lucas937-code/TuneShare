import {AuthService} from "./auth.service";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {map, switchMap, timer} from "rxjs";

export function usernameAvailable(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return timer(500).pipe(
      switchMap(() =>
        authService.usernameAvailable(control.value)
          .pipe(map((isAvailable: { is_available: boolean }) => isAvailable ? null : {isTaken: true})))
    );
  };
}
