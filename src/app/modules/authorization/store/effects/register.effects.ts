import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AppRoutes } from 'src/app/core/routes/routes';
import { RegisterRequestInterface } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/interfaces';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  AuthActionsType,
  registerErrorAction, registerSuccessAction
} from './../actions/auth.actions';

@Injectable()
export class RegisterEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private navigation: NavigationService,
    private persistanceService: PersistanceService
  ) { }

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
}
