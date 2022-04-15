import { createAction, props } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';

export enum LanguagesActionTypes {

  SET_CURRENT_LANGUAGE = '[GENERAL] Set current language',

  GET_CURRENT_LEARNING_LANGUAGE = '[LANGUAGES] Get current learning language',
  GET_CURRENT_LEARNING_LANGUAGE_SUCCESS = '[LANGUAGES] Get current learning language success',
  GET_CURRENT_LEARNING_LANGUAGE_ERROR = '[LANGUAGES] Get current learning language error',

  FetchUserLanguages = '[LANGUAGES] Fetch user languages',
  FetchUserLanguagesSuccess = '[LANGUAGES] Fetch user languages success',
  FetchUserLanguagesError = '[LANGUAGES] Fetch user languages error',

  FetchAllLanguages = '[LANGUAGES] Fetch all languages',
  FetchAllLanguagesSuccess = '[LANGUAGES] Fetch all languages success',
  FetchAllLanguagesError = '[LANGUAGES] Fetch all languages error',

  // SetCurrentLearningLanguageOnServer = '[LANGUAGES] Set current learning language on server',
  // SetCurrentLearningLanguageOnServerSuccess = '[LANGUAGES] Set current learning language on server success',
  // SetCurrentLearningLanguageOnServerError = '[LANGUAGES] Set current learning language on server error',

  AddLanguageToUserLanguages = '[LANGUAGES] Add language to user languages',
  AddLanguageToUserLanguagesSuccess = '[LANGUAGES] Add language to user languages success',
  AddLanguageToUserLanguagesError = '[LANGUAGES] Add language to user languages error',

  DeleteUserLanguage = '[LANGUAGES] Delete user language',
  DeleteUserLanguageSuccess = '[LANGUAGES] Delete user language success',
  DeleteUserLanguageError = '[LANGUAGES] Delete user language error',

  // GET_CURRENT_LEARNING_LANGUAGE = '[LANGUAGES] Get current learning language',
  // GET_CURRENT_LEARNING_LANGUAGE_SUCCESS = '[LANGUAGES] Get current learning language success',
  // GET_CURRENT_LEARNING_LANGUAGE_ERROR = '[LANGUAGES] Get current learning language error',

  SET_CURRENT_LEARNING_LANGUAGE = '[LANGUAGES] Set current learning language',
  SET_CURRENT_LEARNING_LANGUAGE_SUCCESS = '[LANGUAGES] Set current learning language success',
  SET_CURRENT_LEARNING_LANGUAGE_ERROR = '[LANGUAGES] Set current learning language error',

  MarkLanguageAsAddedToUserLanguages = '[LANGUAGES] Mark language as added to user languages'

}

export const setCurrentLanguageAction = createAction(LanguagesActionTypes.SET_CURRENT_LANGUAGE, props<{ language: LanguageInterface }>())

export const getLearningLanguageAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE)
export const getCurrentLearningLanguageSuccessAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE_SUCCESS,
  props<{ currentLanguage: LanguageInterface }>())
export const getCurrentLearningLanguageErrorAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE_ERROR,
  props<{ error: BackendErrorInterface }>());


export const FetchUserLanguagesAction = createAction(LanguagesActionTypes.FetchUserLanguages);
export const FetchUserLanguagesSuccessAction = createAction(LanguagesActionTypes.FetchUserLanguagesSuccess,
  props<{ languages: LanguageInterface[] }>());
export const FetchUserLanguagesErrorAction = createAction(LanguagesActionTypes.FetchUserLanguagesError,
  props<{ backendErrors: BackendErrorInterface }>())

export const FetchAllLanguagesAction = createAction(LanguagesActionTypes.FetchAllLanguages);
export const FetchAllLanguagesSuccessAction = createAction(LanguagesActionTypes.FetchAllLanguagesSuccess,
  props<{ languages: LanguageInterface[] }>());
export const FetchAllLanguagesErrorAction = createAction(LanguagesActionTypes.FetchAllLanguagesError,
  props<{ backendErrors: BackendErrorInterface }>())

// export const SetCurrentLearningLanguageOnServerAction = createAction(LanguagesActionTypes.SetCurrentLearningLanguageOnServer);
// export const SetCurrentLearningLanguageOnServerSuccessAction = createAction(LanguagesActionTypes.SetCurrentLearningLanguageOnServerSuccess,
//   props<{ successData: AfterLoginDataInterface }>());
// export const SetCurrentLearningLanguageOnServerErrorAction = createAction(LanguagesActionTypes.SetCurrentLearningLanguageOnServerError,
//   props<{ backendErrors: BackendErrorInterface }>())

export const AddLanguageToUserLanguagesAction = createAction(LanguagesActionTypes.AddLanguageToUserLanguages,
  props<{ languages: LanguageInterface[] }>())
export const AddLanguageToUserLanguagesSuccessAction = createAction(LanguagesActionTypes.AddLanguageToUserLanguagesSuccess,
  props<{ userLanguages: LanguageInterface[], allLanguages: LanguageInterface[] }>());
export const AddLanguageToUserLanguagesErrorAction = createAction(LanguagesActionTypes.AddLanguageToUserLanguagesError,
  props<{ backendErrors: BackendErrorInterface }>())

export const DeleteUserLanguageAction = createAction(LanguagesActionTypes.DeleteUserLanguage, props<{ languageId: string }>());
export const DeleteUserLanguageSuccessAction = createAction(LanguagesActionTypes.DeleteUserLanguageSuccess,
  props<{ userLanguages: LanguageInterface[], allLanguages: LanguageInterface[], currentLearningLanguage: LanguageInterface }>());
export const DeleteUserLanguageErrorAction = createAction(LanguagesActionTypes.DeleteUserLanguageError,
  props<{ backendErrors: BackendErrorInterface }>())


// export const getLearningLanguageAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE)
// export const getCurrentLearningLanguageSuccessAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE_SUCCESS,
//   props<{ currentLanguage: LanguageInterface }>())
// export const getCurrentLearningLanguageErrorAction = createAction(LanguagesActionTypes.GET_CURRENT_LEARNING_LANGUAGE_ERROR,
//   props<{ error: BackendErrorInterface }>());

export const setCurrentLearningLanguageAction = createAction(LanguagesActionTypes.SET_CURRENT_LEARNING_LANGUAGE,
  props<{ languageId: string }>())
export const setCurrentLearningLanguageSuccessAction = createAction(LanguagesActionTypes.SET_CURRENT_LEARNING_LANGUAGE_SUCCESS,
  props<{ currentLanguage: LanguageInterface }>())
export const setCurrentLearningLanguageErrorAction = createAction(LanguagesActionTypes.SET_CURRENT_LEARNING_LANGUAGE_ERROR,
  props<{ error: BackendErrorInterface }>());
