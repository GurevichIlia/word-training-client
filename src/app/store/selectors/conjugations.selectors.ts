import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { ConjugationsState, CONJUGATIONS_REDUCER_NODE } from '../reducers/conjugations.reducer'

const featureSelector = createFeatureSelector<AppStateInterface, ConjugationsState>(CONJUGATIONS_REDUCER_NODE)

export const isLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
)

export const verbsWithConjugationsSelector = createSelector(
  featureSelector,
  state => state.verbs
)

export const selectedGroupSelector = createSelector(
  featureSelector,
  state => state.selectedGroup
)

export const addGroupModalLoadingSelector = createSelector(
  featureSelector,
  state => state.addGroupModalLoading
)

export const saveVerbsModalLoadingSelector = createSelector(
  featureSelector,
  state => state.saveVerbsModalLoading
)
