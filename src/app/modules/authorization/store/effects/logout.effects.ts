import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AppRoutes } from 'src/app/core/routes/routes';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  AuthActionsType
} from './../actions/auth.actions';

@Injectable()
export class LogoutEffects {

  constructor(
    private actions$: Actions,
    private navigation: NavigationService,
    private persistanceService: PersistanceService
  ) { }


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
