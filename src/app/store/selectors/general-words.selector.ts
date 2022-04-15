import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { GENERAL_WORDS_REDUCER_NODE, IGeneralWordsState } from '../reducers/general-words.reducer'

const featureSelector = createFeatureSelector<AppStateInterface, IGeneralWordsState>(GENERAL_WORDS_REDUCER_NODE)

export const generalWordsSelector = createSelector(
  featureSelector,
  state => state.generalWords
)

export const isLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
)
