import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { GeneralStateInterface, GENERAL_REDUCER_NODE } from '../reducers/general.reducer'

const featureSelector = createFeatureSelector<AppStateInterface, GeneralStateInterface>(GENERAL_REDUCER_NODE)

// export const allWordsSelector = createSelector(
//   featureSelector,
//   state => state.userWords
// )

// export const allWordsQuantitySelector = createSelector(
//   featureSelector,
//   state => state.userWords?.length
// )

// export const csvLoaderSelector = createSelector(
//   featureSelector,
//   state => state.csvLoader
// )

// export const isCloseCsvHandlerSelector = createSelector(
//   featureSelector,
//   state => state.isCloseCsvHandler
// )

// export const isResetCsvHandlerSelector = createSelector(
//   featureSelector,
//   state => state.isResetCsvHandler
// )

// export const isCloseWordsToAssignSelector = createSelector(
//   featureSelector,
//   state => state.isCloseBottomSheet === true ? true : null
// )

// export const isOpenWordsToAssignSelector = createSelector(
//   featureSelector,
//   state => state.isCloseBottomSheet === false ? true : state.isCloseBottomSheet === true ? false : null
// )

// export const isBottomSheetLoadingSelector = createSelector(
//   featureSelector,
//   state => state.bottomSheetLoader
// )
