import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getWordQuantity } from 'src/app/core/utils/get-word-quantity';
import { AppStateInterface } from 'src/app/store/reducers';
import { VocabularyStateInterface, VOCABULARY_REDUCER_NODE } from '../reducers/vocabulary.reducers';

const featureSelector = createFeatureSelector<AppStateInterface, VocabularyStateInterface>(VOCABULARY_REDUCER_NODE)

export const modalLoaderSelector = createSelector(
  featureSelector,
  state => state.vocabularyModalLoader
)

export const vocabularyLoaderSelector = createSelector(
  featureSelector,
  state => state.vocabularyLoader
)

export const isCloseModalSelector = createSelector(
  featureSelector,
  state => state.isCloseModal
)

export const errorSelector = createSelector(
  featureSelector,
  state => state.error
)

export const allWordsSelector = createSelector(
  featureSelector,
  state => state.userWords
)

export const allWordsQuantitySelector = createSelector(
  featureSelector,
  state => state.userWords?.length
)

export const csvLoaderSelector = createSelector(
  featureSelector,
  state => state.csvLoader
)

export const isCloseCsvHandlerSelector = createSelector(
  featureSelector,
  state => state.isCloseCsvHandler
)

export const isResetCsvHandlerSelector = createSelector(
  featureSelector,
  state => state.isResetCsvHandler
)

export const isCloseWordsToAssignSelector = createSelector(
  featureSelector,
  state => state.isCloseBottomSheet === true ? true : null
)

export const isOpenWordsToAssignSelector = createSelector(
  featureSelector,
  state => state.isCloseBottomSheet === false ? true : state.isCloseBottomSheet === true ? false : null
)

export const isBottomSheetLoadingSelector = createSelector(
  featureSelector,
  state => state.bottomSheetLoader
)

export const groupsSelector = createSelector(
  featureSelector,
  (state, isVerbs: boolean) => getWordQuantity(state.userGroups, state.userWords, isVerbs ?? state.isVerbs),

)

export const selectedGroupSelector = createSelector(
  featureSelector,
  state => state.selectedGroup
)

export const isShowOnlyVerbsInVocabularySelector = createSelector(
  featureSelector,
  state => state.isVerbs
)

