import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguagesStateInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { AppStateInterface } from 'src/app/store/reducers';
import { LANGUAGES_REDUCER_NODE } from '../reducers/languages.reducers';


export const languagesFeatureSelector = createFeatureSelector<AppStateInterface, LanguagesStateInterface>(LANGUAGES_REDUCER_NODE);

export const isLoadingSelector = createSelector(
  languagesFeatureSelector,
  state => state.isLoading
);

export const allLanguagesSelector = createSelector(
  languagesFeatureSelector,
  state => state.allLanguages
);

export const userlanguagesSelector = createSelector(
  languagesFeatureSelector,
  state => state.userLanguages
);

export const activeTabSelector = createSelector(
  languagesFeatureSelector,
  state => state.activeLanguagesTab
);

export const errorSelector = createSelector(
  languagesFeatureSelector,
  state => state.error
);

export const currentLanguageSelector = createSelector(
  languagesFeatureSelector,
  state => state.currentLearningLanguage
);
