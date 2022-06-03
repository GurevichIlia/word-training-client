import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomValidators } from 'src/app/shared/custom-validators/custom-validators';
import { registerAction, resetAuthErrorAction } from '../store/actions/auth.actions';
import { backendErrorsSelector, isSubmittingSelector } from '../store/selectors/auth.selectors';
import { AppStateInterface } from './../../../store/reducers';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnDestroy {
  public readonly registrationForm: UntypedFormGroup = this.fb.group({
    nickName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confPassword: ['', Validators.required]
  }, { validators: CustomValidators.matchPassword('password', 'confPassword') });

  public readonly isSubmitting$: Observable<boolean> = this.store$.pipe(select(isSubmittingSelector));
  public readonly registrationError$: Observable<string> = this.store$.pipe(select(backendErrorsSelector))

  constructor(
    private fb: UntypedFormBuilder,
    private store$: Store<AppStateInterface>
  ) { }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confPassword');
  }

  public createUser(): void {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.store$.dispatch(registerAction({ requestData: this.registrationForm.value }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(resetAuthErrorAction())
  }
}
