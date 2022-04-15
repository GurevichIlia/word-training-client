import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { NavigationService } from 'src/app/core';
import { AppRoutes } from 'src/app/core/routes/routes';
import { LanguagesService } from 'src/app/modules/languages/languages.service';
import {
  AddLanguageToUserLanguagesResponseInterface,
  DeleteUserLanguageResponseInterface,
  LanguageInterface
} from 'src/app/modules/languages/types/languages.interfaces';
import { ApiLanguagesService } from 'src/app/shared/services/api/api-languages.service';
import {
  AddLanguageToUserLanguagesErrorAction,
  AddLanguageToUserLanguagesSuccessAction,
  DeleteUserLanguageErrorAction,
  DeleteUserLanguageSuccessAction,
  FetchAllLanguagesErrorAction,
  FetchAllLanguagesSuccessAction,
  FetchUserLanguagesErrorAction,
  FetchUserLanguagesSuccessAction,
  getCurrentLearningLanguageErrorAction,
  getCurrentLearningLanguageSuccessAction,
  LanguagesActionTypes,
  setCurrentLanguageAction,
  setCurrentLearningLanguageErrorAction,
  setCurrentLearningLanguageSuccessAction
} from '../actions/languages.actions';
import { AppStateInterface } from '../reducers';
import { userlanguagesSelector } from '../selectors/languages.selectors';



@Injectable()
export class LanguagesEffects {

  constructor(
    private actions$: Actions,
    private languagesApi: ApiLanguagesService,
    private navigation: NavigationService,
    private languagesService: LanguagesService,
    private store$: Store<AppStateInterface>,


  ) { }

  currentLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE),
    switchMap(_ => {
      return this.languagesApi.getCurrentLanguage$()
        .pipe(
          map(language => getCurrentLearningLanguageSuccessAction({ currentLanguage: language })),
          catchError(err => of(getCurrentLearningLanguageErrorAction({ error: err })))
        )
    })
  ))


  getCurrentLanguageSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE_SUCCESS),
    tap(({ currentLanguage }: { currentLanguage: LanguageInterface }) => {

      if (currentLanguage) {
        // this.generalFacade.setCurrentLanguage(of(resData.currentLanguage));
        this.navigation.navigateTo(AppRoutes.Vocabulary)
      } else {
        this.navigation.navigateTo(AppRoutes.Languages)
      }
    })
  ),
    { dispatch: false }
  )


  addLangauge$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.AddLanguageToUserLanguages),
    switchMap(({ languages }: { languages: LanguageInterface[] }) => {
      return this.languagesService.addUserLanguages(languages)
        .pipe(
          map(({ userLanguages, allLanguages }: AddLanguageToUserLanguagesResponseInterface) => {
            return AddLanguageToUserLanguagesSuccessAction({ userLanguages, allLanguages })
          }),
          catchError((err: { message: string }) => {
            return of(AddLanguageToUserLanguagesErrorAction({ backendErrors: { error: err.message } }))
          })
        )
    }
    ))
  )

  setCurrentLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.SET_CURRENT_LEARNING_LANGUAGE),
    switchMap(({ languageId }: { languageId: string }) => {
      return this.languagesApi.setCurrentLanguageOnServer(languageId)
        .pipe(
          map((currentLanguage: LanguageInterface) => setCurrentLearningLanguageSuccessAction({ currentLanguage })),
          catchError((error) => {
            return of(setCurrentLearningLanguageErrorAction({ error }))
          })
        )
    }
    ))
  )

  setCurrentLanguageSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.SET_CURRENT_LEARNING_LANGUAGE_SUCCESS),
    tap(({ currentLanguage }: { currentLanguage: LanguageInterface }) => {

      if (currentLanguage) {
        // this.store$.dispatch(setCurrentLanguageAction({ language: currentLanguage }))
        this.navigation.navigateTo(AppRoutes.Vocabulary)
      }
    })
  ),
    { dispatch: false }
  )


  allLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.FetchAllLanguages),
    switchMap(_ => {
      return this.languagesService.getAllLanguages()
        .pipe(
          map((allLanguages: LanguageInterface[]) => this.languagesService.addCountryFlagToLanguage(allLanguages)),
          switchMap((languages: LanguageInterface[]) => {
            const allLanguages$ = this.store$.pipe(
              select(userlanguagesSelector),
              filter(userLanguages => userLanguages !== null),
              map(userLanguages => this.languagesService.markLanguageAsAddedToUserLanguages(languages, userLanguages))
            )

            return allLanguages$
          }),
          map((languages: LanguageInterface[]) => {
            return FetchAllLanguagesSuccessAction({ languages })
          }),
          catchError((err: { message: string }) => {
            return of(FetchAllLanguagesErrorAction({ backendErrors: { error: err.message } }))
          })
        )
    }
    ))
  )


  userLanguages$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.FetchUserLanguages),
    switchMap(_ => {
      return this.languagesService.getUserLanguages()
        .pipe(
          map((languages: LanguageInterface[]) => {
            return FetchUserLanguagesSuccessAction({ languages })
          }),
          catchError((err: { message: string }) => {
            return of(FetchUserLanguagesErrorAction({ backendErrors: { error: err.message } }))
          })
        )
    }
    ))
  )

  deleteUserLanguage$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.DeleteUserLanguage),
    switchMap(({ languageId }: { languageId: string }) => {

      return this.languagesService.deleteUserLanguage(languageId)
        .pipe(
          map(({ userLanguages, allLanguages, currentLearningLanguage }: DeleteUserLanguageResponseInterface) => {
            return DeleteUserLanguageSuccessAction({ userLanguages, allLanguages, currentLearningLanguage })
          }),
          catchError((err: { message: string }) => {
            return of(DeleteUserLanguageErrorAction({ backendErrors: { error: err.message } }))
          })
        )
    }
    ))
  )

  deleteUserLanguageSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LanguagesActionTypes.DeleteUserLanguageSuccess),
    tap(({ currentLearningLanguage }: DeleteUserLanguageResponseInterface) => {
      // this.store$.dispatch(setCurrentLanguage({ language: currentLearningLanguage }))
      // this.store$.dispatch(getLearningLanguageAction())

      // this.store$.dispatch(FetchUserLanguagesAction())
    })
  ),
    { dispatch: false }
  )

}
