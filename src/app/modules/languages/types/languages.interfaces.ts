import { BackendErrorInterface } from 'src/app/core';
import { ActiveLanguagesTab } from './languages.enums';

export interface LanguagesStateInterface {
  currentLearningLanguage: LanguageInterface | null | undefined
  isLoading: boolean,
  error: BackendErrorInterface | null | string,
  allLanguages: LanguageInterface[] | null,
  userLanguages: LanguageInterface[] | [],
  activeLanguagesTab: ActiveLanguagesTab,
  languageCandidateToLearn: LanguageInterface
}

export interface SetCurrentLanguageResponseInterface {
  currentLanguage: LanguageInterface;
  message: string;
}

export interface LanguageInterface {
  name: string;
  _id?: string;
  addedToUser?: boolean;
  flag?: string;
}

export interface AddLanguageToUserLanguagesResponseInterface {
  allLanguages: LanguageInterface[],
  userLanguages: LanguageInterface[],
  message: 'Languages added'
}

export interface DeleteUserLanguageResponseInterface {
  currentLearningLanguage: LanguageInterface,
  allLanguages: LanguageInterface[],
  userLanguages: LanguageInterface[],
  message: 'Language removed'
}

export interface SetLearningLanguageResponseInterface {
  currentLanguage: LanguageInterface,
  message: 'Language selected'
}
