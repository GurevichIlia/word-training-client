import { AppRoutes } from 'src/app/core/routes/routes';
import { NavigationService } from 'src/app/core';
import { UpdateWordsResponseInterface } from './../../core/models/words.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Word } from 'src/app/shared/interfaces';
import { fetchGroupsAction, setWordsAndGroupsAction } from '../actions/vocabulary.actions';
import {
  saveTrainingProgressAction,
  saveTrainingProgressErrorAction,
  saveTrainingProgressSuccessAction, stopTrainingCancelAction, stopTrainingSuccessAction, WordTrainingActionsType
} from '../actions/word-training.actions';
import { AppStateInterface } from '../reducers';
import { wordsToSaveSelector } from '../selectors/word-training.selector';
import { ApiWordsService } from './../../shared/services/api/api-words.service';

@Injectable()
export class WordTrainingEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppStateInterface>,
    private wordsApiService: ApiWordsService,
    private navigationService: NavigationService
  ) {

  }

  stopTraining$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordTrainingActionsType.StopTraining),
      switchMap(_ => {

        if (confirm('Do you want to stop training?')) {

          return of(stopTrainingSuccessAction())

        } else {
          return of(stopTrainingCancelAction())
        }

      })))

  stopTrainingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordTrainingActionsType.StopTrainingSuccess),
      tap(() => {
        this.navigationService.navigateTo(AppRoutes.TrainResult)
        this.store$.dispatch(saveTrainingProgressAction())
        // this.store$.dispatch(fetchGroupsAction())
      })
    ), { dispatch: false })






  saveTrainingProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordTrainingActionsType.SaveTrainingProgress),
      switchMap(() => this.store$.pipe(
        select(wordsToSaveSelector),
        take(1),
        switchMap((uniqueLearnedWords: Word[]) => this.wordsApiService.updateWords(uniqueLearnedWords)),
      )),
      map(({ words, groups }: UpdateWordsResponseInterface) => {
        return saveTrainingProgressSuccessAction({ words, groups });
      }),
      catchError((err: HttpErrorResponse) => {
        return of(saveTrainingProgressErrorAction({ error: err.error.message }))
      })
    )
  )


  saveTrainingProgressSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WordTrainingActionsType.SaveTrainingProgressSuccess),
      tap(({ words, groups }: UpdateWordsResponseInterface) => {
        this.store$.dispatch(setWordsAndGroupsAction({ words, groups }))
        // this.store$.dispatch(fetchGroupsAction())
      })
    ), { dispatch: false })

  // stopTraining$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WordTrainingActionsType.StopTraining),
  //     tap(_ => this.navigationService.navigateTo(AppRoutes.TrainResult))
  //   ), { dispatch: false })
}
