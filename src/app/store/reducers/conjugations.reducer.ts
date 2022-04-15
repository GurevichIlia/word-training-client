import { Action, createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core';
import { ReducerNode } from 'src/app/core/enums/store.enum';
import { VerbWithConjugations } from 'src/app/modules/conjugations/models/conjugations.interface';
import { WordGroup } from 'src/app/shared/interfaces';
import {
  addGroupToUserGroupsAction,
  addGroupToUserGroupsErrorAction,
  addGroupToUserGroupsSuccessAction,
  fetchConjugationsAction,
  fetchConjugationsErrorAction,
  fetchConjugationsFromCSVAction,
  fetchConjugationsFromCSVErrorAction,
  fetchConjugationsFromCSVSuccessAction,
  fetchConjugationsSuccessAction,
  saveVerbsAction,
  saveVerbsErrorAction,
  saveVerbsSuccessAction,
  selectConjugationsGroupAction,
  selectVerbForSavingAction,
  selectVerbsForSavingToggleAction
} from './../actions/conjugations.actions';

export const CONJUGATIONS_REDUCER_NODE: ReducerNode.CONJUGATIONS = ReducerNode.CONJUGATIONS

export interface ConjugationsState {
  error: BackendErrorInterface | string | null,
  verbs: VerbWithConjugations[]
  addGroupModalLoading: boolean;
  saveVerbsModalLoading: boolean;
  isLoading: boolean;
  selectedGroup: WordGroup
}

const initialState: ConjugationsState = {
  error: null,
  verbs: null,
  saveVerbsModalLoading: false,
  addGroupModalLoading: false,
  selectedGroup: null,
  isLoading: false
}

export const reducer = createReducer(
  initialState,
  on(
    fetchConjugationsFromCSVAction,
    fetchConjugationsAction,
    (state, action): ConjugationsState => ({
      ...state,
      isLoading: true,
      verbs: null,

    })
  ),
  on(
    fetchConjugationsFromCSVSuccessAction,
    fetchConjugationsSuccessAction,
    (state, action): ConjugationsState => ({
      ...state,
      isLoading: false,
      verbs: action.verbs,
    })
  ),
  on(
    fetchConjugationsFromCSVErrorAction,
    fetchConjugationsErrorAction,
    (state, action): ConjugationsState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    addGroupToUserGroupsAction,
    (state, action): ConjugationsState => ({
      ...state,
      addGroupModalLoading: true,
    })
  ),
  on(
    addGroupToUserGroupsSuccessAction,
    (state, { group }): ConjugationsState => ({
      ...state,
      selectedGroup: group,
      addGroupModalLoading: false,
    })
  ),
  on(
    addGroupToUserGroupsErrorAction,
    (state, { error }): ConjugationsState => ({
      ...state,
      error,
      addGroupModalLoading: false,
    })
  ),
  on(
    selectConjugationsGroupAction,
    (state, { group }): ConjugationsState => ({
      ...state,
      selectedGroup: group,
    })
  ),
  on(
    saveVerbsAction,
    (state, action): ConjugationsState => ({
      ...state,
      saveVerbsModalLoading: true,
    })
  ),
  on(
    saveVerbsSuccessAction,
    (state): ConjugationsState => ({
      ...state,
      verbs: null,
      saveVerbsModalLoading: false,
    })
  ),
  on(
    saveVerbsErrorAction,
    (state, { error }): ConjugationsState => ({
      ...state,
      error,
      saveVerbsModalLoading: false,
    })
  ),
  on(
    selectVerbsForSavingToggleAction,
    (state): ConjugationsState => ({
      ...state,
      verbs: state.verbs.map(verb => ({ ...verb, selected: !verb.selected }))
    })
  ),
  on(
    selectVerbForSavingAction,
    (state, { verb }): ConjugationsState => ({
      ...state,
      verbs: state.verbs.map(existingVerb =>
        existingVerb.verb === verb.verb
          ? ({ ...existingVerb, selected: !existingVerb.selected })
          : existingVerb)

    })
  )


)

export const conjugationsReducer = (state: ConjugationsState, action: Action) => {
  return reducer(state, action)
}
