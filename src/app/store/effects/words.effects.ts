import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { CsvHandlerService } from './../../core/services/csv-handler.service';
import { deleteUserWordFromGroupErrorAction, deleteUserWordFromGroupSuccessAction, fetchGroupsAction, VocabularyActionsType } from './../actions/vocabulary.actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { switchMap, tap, map, catchError, take, withLatestFrom } from 'rxjs/operators';
import { WordsService } from 'src/app/core/services';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { Word, WordGroup } from 'src/app/shared/interfaces';
import { AppStateInterface } from 'src/app/store/reducers';
import {

  fetchWordsSuccessAction,
  fetchWordsErrorAction,
  addWordToUserWordsErrorAction,
  addWordToUserWordsSuccessAction,
  deleteUserWordErrorAction,
  deleteUserWordSuccessAction,
  saveEditedWordErrorAction,
  saveEditedWordSuccessAction,
  setWordAsFavoriteErrorAction,
  setWordAsFavoriteSuccessAction,
  addWordsFromCsvSuccessAction,
  addWordsFromCsvErrorAction,
  shareWordToGeneralWordsSuccessAction,
  shareWordToGeneralWordsErrorAction
} from '../actions/vocabulary.actions';
import { currentLanguageSelector } from './../selectors/languages.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { selectedGroupSelector } from '../selectors/vocabulary.selectors';
import { IAddWordToGeneralListResponse } from 'src/app/core/models/words.interface';

@Injectable()
export class WordsEffects {

  constructor(
    private actions$: Actions,
    private wordsService: WordsService,
    private store$: Store<AppStateInterface>,
    private notificationService: NotificationsService,
  ) { }

  loadWords$ = createEffect(() => this.actions$.pipe(
    ofType(VocabularyActionsType.FetchWords),
    switchMap(_ => {
      return this.store$.pipe(
        select(currentLanguageSelector),
        take(1),
        switchMap((language: LanguageInterface) =>
          this.wordsService.getAllUserWords$(language)
            .pipe(
              map((words: Word[]) => {
                return fetchWordsSuccessAction({ words });
              }),
              catchError((err: any) => of(fetchWordsErrorAction({ error: err })))
            ))
      )
    })
  ));

  addWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.AddWordToUserWords),
      switchMap(({ word }: { word: Partial<Word> }) => {
        return combineLatest([
          this.store$.pipe(select(currentLanguageSelector), take(1)),
          this.store$.pipe(select(selectedGroupSelector), take(1)),
          of(word)
        ])
      }),
      switchMap(([language, selectedGroup, wordToAdd]: [LanguageInterface, WordGroup, Partial<Word>]) =>
        this.wordsService.addNewWord(wordToAdd, language, selectedGroup._id)
          .pipe(
            map(({ words, groups }: { words: Word[], groups: WordGroup[] }) => {
              return addWordToUserWordsSuccessAction({ words, groups });
            }),
            catchError((err: HttpErrorResponse) => {
              return of(addWordToUserWordsErrorAction({ error: err.error.message }))
            })
          ))
    )
  )

  addWordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.AddWordToUserWordsSuccess),
      tap(_ => this.notificationService.success('Word added'))
    ), { dispatch: false })

  addWordError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.AddWordToUserWordsError),
      tap((res: { error: string }) => {
        this.notificationService.warning(res.error)
      })
    ), { dispatch: false })

  deleteWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.DeleteUserWord),
      switchMap(({ word }: { word: Word }) =>
        this.wordsService.deleteWord(word)
          .pipe(
            map(({ words, groups }: { words: Word[], groups: WordGroup[] }) => {
              return deleteUserWordSuccessAction({ words, groups });
            }),
            catchError((err) => {
              return of(deleteUserWordErrorAction({ error: err.error.message }))
            })
          ))
    )
  )

  // deleteWordSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(VocabularyActionsType.DeleteUserWordsuccess),
  //     tap(_ => this.store$.dispatch(fetchGroupsAction()))
  //   ), { dispatch: false })

  deleteWordFromGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.DeleteUserWordFromGroup),
      switchMap(({ word }: { word: Word }) =>
        this.store$.pipe(
          select(selectedGroupSelector),
          take(1),
          switchMap(selectedGroup => this.wordsService.deleteWordFromGroup(word, selectedGroup._id)
            .pipe(
              map(({ words, groups }: { words: Word[], groups: WordGroup[] }) => {
                return deleteUserWordFromGroupSuccessAction({ words, groups });
              }),
              catchError((err) => {
                return of(deleteUserWordFromGroupErrorAction({ error: err.error.message }))
              })
            ))
        ))
    ),


  )

  saveEditedWord$ = createEffect(
    () => this.actions$.pipe(
      ofType(VocabularyActionsType.SaveEditedWord),
      switchMap(({ word }: { word: Word }) =>
        this.wordsService.editWord(word)
          .pipe(
            map((words: Word[]) => {
              return saveEditedWordSuccessAction({ words });
            }),
            catchError((err) => {
              return of(saveEditedWordErrorAction({ error: err.error.message }))
            })
          )))
  )


  addWordsFromCsv$ = createEffect(
    () => this.actions$.pipe(
      ofType(VocabularyActionsType.AddWordsFromCsv),
      withLatestFrom(this.store$.pipe(select(selectedGroupSelector))),
      switchMap(([{ file }, selectedGroup]: [{ file: File, type: string }, WordGroup]) => {
        if (!file) {
          return of(addWordsFromCsvErrorAction({ error: 'Please select CSV file' }))
        };

        if (!file.name.includes('csv')) {
          return of(addWordsFromCsvErrorAction({ error: 'Please select CSV file' }))
          // this.notification.info('Please select CSV file');
          // return EMPTY;
        }

        return this.wordsService.addNewWordsFromCSV({ file, selectedGroupId: selectedGroup._id })
          .pipe(
            map(({ words, groups }: { words: Word[], groups: WordGroup[] }) => {
              return addWordsFromCsvSuccessAction({ words, groups });
            }),
            catchError((err) => {
              return of(addWordsFromCsvErrorAction({ error: err.message }))
            })
          )
      }))
  )

  // addWordsFromCsvSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(VocabularyActionsType.AddWordsFromCsvSuccess),
  //     tap(_ => {
  //       this.store$.dispatch(fetchGroupsAction())
  //       this.notificationService.success('Words added')
  //     })
  //   ), { dispatch: false })


  markAsFavorite$ = createEffect(
    () => this.actions$.pipe(
      ofType(VocabularyActionsType.SetWordAsFavorite),
      switchMap(({ word }: { word: Word }) =>

        this.wordsService.editWord({ ...word, isFavorite: !word.isFavorite })
          .pipe(
            map((words: Word[]) => {
              return setWordAsFavoriteSuccessAction();
            }),
            catchError((err) => {
              return of(setWordAsFavoriteErrorAction({ word, error: err.error.message }))
            })
          )))
  )

  shareWordToGeneralWords$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.ShareWordToGeneralWords),
      switchMap(({ words }: { words: Word[] }) =>
        this.wordsService.shareWordsToGeneralList(words)
          .pipe(
            map(({ userWords }: IAddWordToGeneralListResponse) => {
              return shareWordToGeneralWordsSuccessAction({ words: userWords });
            }),
            catchError((err) => {
              return of(shareWordToGeneralWordsErrorAction({ error: err.message }))
            })
          ))
    )
  )

  shareWordToGeneralWordsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VocabularyActionsType.ShareWordToGeneralWordsSuccess),
      tap(_ => {
        this.notificationService.success('Shared')
      })
    ), { dispatch: false })
}
