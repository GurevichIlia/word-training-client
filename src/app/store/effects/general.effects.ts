import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../reducers';
@Injectable()
export class GeneralEffects {

  constructor(
    private actions$: Actions,

    private store$: Store<AppStateInterface>,

  ) { }


  // isUpdateData$ = createEffect(() => this.actions$.pipe(
  //   ofType(GeneralActionsType.UPDATE_GROUPS_AND_WORDS),
  //   tap(({ isUpdate }: { isUpdate: boolean }) => {
  //
  //     if (isUpdate) {

  //       this.store$.dispatch(fetchWordsAction())
  //       this.store$.dispatch(fetchGroupsAction())
  //     }


  //   })
  // ),
  //   { dispatch: false }
  //
}
