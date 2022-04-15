import { setWordsAndGroupsAction } from './../actions/vocabulary.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GeneralWord, IDeleteGeneralWordResponse } from 'src/app/modules/general-words/types/general-words.interfaces';
import { ApiWordsService } from 'src/app/shared/services/api/api-words.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {
  deleteGeneralWordErrorAction,
  deleteGeneralWordSuccessAction,
  fetchGeneralWordsErrorAction,
  fetchGeneralWordsSuccessAction,
  GeneralWordsActionsType
} from '../actions/general-words.actions';
import { fetchGroupsAction } from '../actions/vocabulary.actions';
import { AppStateInterface } from '../reducers';

@Injectable()
export class GeneralWordsEffects {
  constructor(
    private actions$: Actions,
    private apiWords: ApiWordsService,
    private store$: Store<AppStateInterface>,
    private notificationService: NotificationsService,

  ) {

  }

  fetchGeneralWords$ = createEffect(() => this.actions$.pipe(
    ofType(GeneralWordsActionsType.FetchGeneralWords),
    switchMap(_ =>
      this.apiWords.getGeneralWordsForAll()
        .pipe(
          map((words: GeneralWord[]) => {
            return fetchGeneralWordsSuccessAction({ words });
          }),
          catchError((err: any) => of(fetchGeneralWordsErrorAction({ error: err.message })))
        ))
  ))

  deleteGeneralWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GeneralWordsActionsType.DeleteGeneralWord),
      switchMap(({ word }: { word: GeneralWord }) =>
        this.apiWords.deleteWordFromGeneralList(word._id)
          .pipe(
            map(({ generalWords, word, message, userWords }: IDeleteGeneralWordResponse) => {
              return deleteGeneralWordSuccessAction({ words: generalWords, userWords });
            }),
            catchError((err) => {
              return of(deleteGeneralWordErrorAction({ error: err.message }))
            })
          ))
    )
  )

  deleteWordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GeneralWordsActionsType.DeleteGeneralWordSuccess),
      tap(({ userWords }: Pick<IDeleteGeneralWordResponse, 'userWords' | 'generalWords'>) => {
        this.notificationService.success('Deleted from shared')
        this.store$.dispatch(setWordsAndGroupsAction({ words: userWords, groups: null }))
        this.store$.dispatch(fetchGroupsAction())
      })
    ), { dispatch: false })
}

