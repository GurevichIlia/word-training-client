import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/interfaces';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { AppStateInterface } from 'src/app/store/reducers';
import {
  AuthActionsType,
  getCurrentUserErrorAction,
  getCurrentUserSuccessAction
} from './../actions/auth.actions';

@Injectable()
export class CurrentUserEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private navigation: NavigationService,
    private store$: Store<AppStateInterface>,
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

  getUserSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionsType.GET_CURRENT_USER_SUCCESS),
    tap(({ currentUser }: { currentUser: CurrentUserInterface }) => {
      // this.store$.dispatch(getCurrentLearningLanguageAction());

      // this.store$.dispatch(setLearninLanguageAction({ currentLanguage: currentUser.currentLanguage }))
    })
  ), { dispatch: false })
}
