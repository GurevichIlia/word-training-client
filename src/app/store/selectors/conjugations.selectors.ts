import { allGroupsSelector } from 'src/app/store/selectors/vocabulary.selectors';
import { All } from './../../core/models/groups.model';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { ConjugationsState, CONJUGATIONS_REDUCER_NODE } from '../reducers/conjugations.reducer'
import { selectExistingVerbs } from './vocabulary.selectors'
import { WordGroup } from 'src/app/shared/interfaces';
import { GroupsUtils } from 'src/app/core/utils/groups.utils';

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
  allGroupsSelector,
  selectExistingVerbs,
  (groups, existingVerbs) => {

    const verbsGroups = GroupsUtils.getGroupsForVerbs(groups ?? [])

    return GroupsUtils.getWordsQuantity(verbsGroups, existingVerbs)
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
