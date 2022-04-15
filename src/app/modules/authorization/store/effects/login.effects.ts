import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AppRoutes } from 'src/app/core/routes/routes';
import { AfterLoginDataInterface, LoginRequestInterface } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  AuthActionsType,
  loginErrorAction,
  loginSuccessAction,
} from './../actions/auth.actions';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private navigation: NavigationService,
    private persistanceService: PersistanceService
  ) { }


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
}
