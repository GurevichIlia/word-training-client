import { Action, createReducer, on } from '@ngrx/store';
import { ReducerNode } from 'src/app/core/enums/store.enum';
import { ActiveLanguagesTab } from 'src/app/modules/languages/types/languages.enums';
import { LanguagesStateInterface } from 'src/app/modules/languages/types/languages.interfaces';

import {
  AddLanguageToUserLanguagesAction,
  AddLanguageToUserLanguagesErrorAction,
  AddLanguageToUserLanguagesSuccessAction,
  DeleteUserLanguageAction,
  DeleteUserLanguageErrorAction,
  DeleteUserLanguageSuccessAction,
  FetchAllLanguagesAction, FetchAllLanguagesErrorAction, FetchAllLanguagesSuccessAction,
  FetchUserLanguagesAction, FetchUserLanguagesErrorAction, FetchUserLanguagesSuccessAction,
  getCurrentLearningLanguageErrorAction,
  getCurrentLearningLanguageSuccessAction,
  getLearningLanguageAction,
  setCurrentLearningLanguageAction, setCurrentLearningLanguageErrorAction, setCurrentLearningLanguageSuccessAction
} from './../actions/languages.actions';

export const LANGUAGES_REDUCER_NODE: ReducerNode.LANGUAGES = ReducerNode.LANGUAGES

const initialState: LanguagesStateInterface = {
  currentLearningLanguage: undefined,
  isLoading: false,
  error: null,
  allLanguages: null,
  userLanguages: [],
  languageCandidateToLearn: null,
  activeLanguagesTab: ActiveLanguagesTab.AllLanguages
}

const reducers = createReducer(
  initialState,
  on(
    FetchAllLanguagesAction,
    (state): LanguagesStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    FetchAllLanguagesSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      allLanguages: action.languages
    })
  ),
  on(
    FetchAllLanguagesErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.backendErrors
    })
  ),
  on(
    FetchUserLanguagesAction,
    (state): LanguagesStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    FetchUserLanguagesSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      userLanguages: action.languages,
      activeLanguagesTab: action.languages.length > 0 ? ActiveLanguagesTab.UserLanguages : ActiveLanguagesTab.AllLanguages
    })
  ),
  on(
    FetchUserLanguagesErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.backendErrors
    })
  ),
  on(
    AddLanguageToUserLanguagesAction,
    (state): LanguagesStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    AddLanguageToUserLanguagesSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      allLanguages: action.allLanguages,
      userLanguages: action.userLanguages,
      languageCandidateToLearn: action.userLanguages[action.userLanguages.length - 1],
      activeLanguagesTab: action.userLanguages.length > 0 ? ActiveLanguagesTab.UserLanguages : ActiveLanguagesTab.AllLanguages
    })
  ),
  on(
    AddLanguageToUserLanguagesErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.backendErrors
    })
  ),
  on(
    DeleteUserLanguageAction,
    (state): LanguagesStateInterface => ({
      ...state,
      isLoading: true,

    })
  ),
  on(
    DeleteUserLanguageSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      userLanguages: action.userLanguages,
      allLanguages: action.allLanguages,
      currentLearningLanguage: action.currentLearningLanguage,
      activeLanguagesTab: action.userLanguages.length > 0 ? ActiveLanguagesTab.UserLanguages : ActiveLanguagesTab.AllLanguages,
    })
  ),
  on(
    DeleteUserLanguageErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.backendErrors
    })
  ),
  on(
    getLearningLanguageAction,
    (state): LanguagesStateInterface => ({
      ...state,
      // isLoading: true
    })),
  on(
    getCurrentLearningLanguageSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      // isLoading: false,
      currentLearningLanguage: action.currentLanguage
    })),
  on(
    getCurrentLearningLanguageErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      // isLoading: false,
      error: action.error
    })),
  on(
    setCurrentLearningLanguageAction,
    (state): LanguagesStateInterface => ({
      ...state,
      isLoading: true
    })),
  on(
    setCurrentLearningLanguageSuccessAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      currentLearningLanguage: action.currentLanguage
    })),
  on(
    setCurrentLearningLanguageErrorAction,
    (state, action): LanguagesStateInterface => ({
      ...state,
      isLoading: false,
      error: action.error
    })),
)


export function languagesReducer(state: LanguagesStateInterface, action: Action) {
  return reducers(state, action)
}
