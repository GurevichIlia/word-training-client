import { All } from './../../core/models/groups.model';
import { getWordQuantity } from 'src/app/core/utils/get-word-quantity';
import { filterGroupsForVerbs } from './../../core/utils/groups.utils';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { ConjugationsState, CONJUGATIONS_REDUCER_NODE } from '../reducers/conjugations.reducer'
import { allWordsSelector, groupsSelector, selectExistingVerbs } from './vocabulary.selectors'
import { WordGroup } from 'src/app/shared/interfaces';

const featureSelector = createFeatureSelector<AppStateInterface, ConjugationsState>(CONJUGATIONS_REDUCER_NODE)

export const isLoadingSelector = createSelector(
  featureSelector,
  state => state.isLoading
)

export const verbsWithConjugationsSelector = createSelector(
  featureSelector,
  state => state.verbs
)



export const addGroupModalLoadingSelector = createSelector(
  featureSelector,
  state => state.addGroupModalLoading
)

export const saveVerbsModalLoadingSelector = createSelector(
  featureSelector,
  state => state.saveVerbsModalLoading
)

export const selectGroupsForVerbs = createSelector(
  groupsSelector,
  selectExistingVerbs,
  (groups, existingVerbs) => {

    const verbsGroups = filterGroupsForVerbs(groups ?? [])

    return getWordQuantity(verbsGroups, existingVerbs)
  }
)

export const selectedGroupSelector = createSelector(
  featureSelector,
  selectGroupsForVerbs,
  (state, groupsForVerbs): WordGroup => {
    const test = state.selectedGroup ?? groupsForVerbs[All]
    return test
  }
)
