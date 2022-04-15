import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { LoginRequestInterface, AfterLoginDataInterface, RegisterRequestInterface } from 'src/app/core/models/auth.model';
import { AppRoutes } from 'src/app/core/routes/routes';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/interfaces';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { AppStateInterface } from 'src/app/store/reducers';
import {
  AuthActionsType,
  getCurrentUserErrorAction,
  getCurrentUserSuccessAction,
  loginErrorAction,
  loginSuccessAction,
  registerErrorAction,
  registerSuccessAction
} from './../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private navigation: NavigationService,
    private persistanceService: PersistanceService
  ) { }

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.GET_CURRENT_USER),
    switchMap(_ => {
      const token = this.persistanceService.get('words-token')
      if (!token) {
        return of(getCurrentUserErrorAction())
      }
      return this.authService.getCurrentUser()
        .pipe(
          map((user: CurrentUserInterface) => getCurrentUserSuccessAction({ currentUser: user })),
          catchError(_ => {
            return of(getCurrentUserErrorAction())
          })
        )
    }
    ))
  )

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.LOGIN),
    switchMap(({ requestData }: { requestData: LoginRequestInterface }) => {
      return this.authService.login(requestData)
        .pipe(
          map((successData: AfterLoginDataInterface) => {
            this.persistanceService.set('words-token', successData.token)
            this.persistanceService.set('word-training-email', successData.currentUser.email)
            return loginSuccessAction({ successData })
          }),
          catchError((err: { message: string }) => {
            return of(loginErrorAction({ backendErrors: err.message }))
          })
        )
    }
    ))
  )

  register$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.REGISTER),
    switchMap(({ requestData }: { requestData: RegisterRequestInterface }) => {
      return this.authService.registration(requestData)
        .pipe(
          map((user: CurrentUserInterface) => registerSuccessAction({ currentUser: user })),
          catchError((err: { message: string }) => {
            return of(registerErrorAction({ backendErrors: err.message }))
          })
        )
    }
    ))
  )

  successRegister$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.REGISTER_SUCCESS),
    tap(_ => this.navigation.navigateTo(AppRoutes.Login))
  ),
    { dispatch: false }
  )

  successLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.LOGIN_SUCCESS),
    tap(({ successData }: { successData: AfterLoginDataInterface }) => {
      if (successData.currentLanguage) {
        // this.generalFacade.setCurrentLanguage(of(resData.currentLanguage));
        this.navigation.navigateTo(AppRoutes.Vocabulary)
      } else {
        this.navigation.navigateTo(AppRoutes.Languages)
      }
    })
  ),
    { dispatch: false }
  )

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.LOGOUT),
    tap(_ => {
      this.navigation.navigateTo(AppRoutes.Login)
      this.persistanceService.clearToken();
    }
    )),
    { dispatch: false }
  )

}
