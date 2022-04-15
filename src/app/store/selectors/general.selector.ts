import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/reducers';
import { GeneralStateInterface, GENERAL_REDUCER_NODE } from './../reducers/general.reducer';

const featureSelector = createFeatureSelector<AppStateInterface, GeneralStateInterface>(GENERAL_REDUCER_NODE)

export const globalLoaderSelector = createSelector(
  featureSelector,
  state => state.globalLoader
)

// export const modalLoaderSelector = createSelector(
//   featureSelector,
//   state => state.modalLoader
// )

// export const isCloseModalSelector = createSelector(
//   featureSelector,
//   state => state.isCloseModal
// )

export const errorSelector = createSelector(
  featureSelector,
  state => state.error
)

export const isUpdateGroupsAndWordsSelector = createSelector(
  featureSelector,
  state => state.isUpdateGroupsAndWords
)
