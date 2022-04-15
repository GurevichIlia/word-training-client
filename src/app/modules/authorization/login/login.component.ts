import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/core/routes/routes';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import * as kf from '../../../shared/keyframes';
import { loginAction } from '../store/actions/auth.actions';
import { backendErrorsSelector, isRegistrationSuccessSelector, isSubmittingSelector } from '../store/selectors/auth.selectors';
import { LoginRequestInterface } from './../../../core/models/auth.model';
import { NavigationService } from './../../../core/services/navigation.service';
import { CurrentUserInterface } from './../../../shared/interfaces';
import { AppStateInterface } from './../../../store/reducers';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginAnimator', [
      transition('* => swing', animate(500, keyframes(kf.swing)))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public readonly TEST_EMAIL = 'test-acc@test.com';
  public readonly TEST_PASSWORD = 'testacc';

  public readonly loginForm: FormGroup = this.fb.group({
    email: [this.authService.lastEmail || this.TEST_EMAIL, [Validators.required, Validators.email]],
    password: [this.authService.lastEmail ? '' : this.TEST_PASSWORD, Validators.required]
  });

  public readonly isRegistrationSuccess$: Observable<boolean> = this.store$.pipe(
    select(isRegistrationSuccessSelector),
    tap(registration => {
      if (registration.isSuccess) {
        this.setUserData(registration.user)
      }
    }),
    map(registration => registration.isSuccess)
  )

  public readonly isSubmitting$: Observable<boolean> = this.store$.pipe(
    select(isSubmittingSelector),
    shareReplay(),
  );

  public readonly loginError$: Observable<string> = this.store$.pipe(
    select(backendErrorsSelector)
  )

  constructor(
    private fb: FormBuilder,
    private store$: Store<AppStateInterface>,
    private navigation: NavigationService,
    private authService: AuthService
  ) { }

  public login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const requestData: LoginRequestInterface = this.loginForm.value
    this.store$.dispatch(loginAction({ requestData }))

  }

  public goToRegistration() {
    this.navigation.navigateTo(AppRoutes.Register);
  }

  private setUserData(user: CurrentUserInterface) {
    this.loginForm.patchValue({
      email: user.email,
    });

  }

}
