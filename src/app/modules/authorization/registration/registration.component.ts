import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { registerAction } from '../store/actions/auth.actions';
import { backendErrorsSelector, isSubmittingSelector } from '../store/selectors/auth.selectors';
import { AppStateInterface } from './../../../store/reducers';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  isPasswordsDontMatch = false;

  public readonly registrationForm: FormGroup = this.fb.group({
    nickName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confPassword: ['', Validators.required]
  });

  public readonly isSubmitting$: Observable<boolean> = this.store$.pipe(select(isSubmittingSelector));
  public readonly registrationError$: Observable<string> = this.store$.pipe(select(backendErrorsSelector))

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
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

  public createUser() {
    this.isPasswordsDontMatch = !this.authService.isPasswordsMatch(this.password.value, this.confirmPassword.value)

    if (this.registrationForm.invalid || this.isPasswordsDontMatch) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.store$.dispatch(registerAction({ requestData: this.registrationForm.value }));
  }

}
