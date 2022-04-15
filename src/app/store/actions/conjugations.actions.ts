import { createAction, props } from '@ngrx/store';
import { VerbTime, VerbWithConjugations } from 'src/app/modules/conjugations/models/conjugations.interface';
import { Word } from 'src/app/shared/interfaces';
import { WordGroup } from './../../shared/interfaces';

export enum ConjugationsActionsType {
  FetchConjugations = '[Conjugations] Fetch conjugations',
  FetchConjugationsSuccess = '[Conjugations] Fetch conjugations success',
  FetchConjugationsError = '[Conjugations] Fetch conjugations error',

  FetchConjugationsFromCSV = '[Conjugations] Fetch conjugations from csv',
  FetchConjugationsFromCSVSuccess = '[Conjugations] Fetch conjugations from csv success',
  FetchConjugationsFromCSVError = '[Conjugations] Fetch conjugations from csv error',

  SelectConjugationsGroup = '[Conjugations] Select conjugations group',

  SelectVerbForSaving = '[Conjugations] Select verb for saving',
  SelectVerbsForSavingToggle = '[Conjugations] Select verbs for saving toggle',

  AddGroupToUserGroups = '[Conjugations] Add Group to user Groups',
  AddGroupToUserGroupsSuccess = '[Conjugations] Add Group to user Groups success',
  AddGroupToUserGroupsError = '[Conjugations] Add Group to user Groups error',

  SaveVerbs = '[Conjugations] Save verbs',
  SaveVerbsSuccess = '[Conjugations] Save verbs success',
  SaveVerbsError = '[Conjugations] Save verbs error',

}


export const fetchConjugationsAction = createAction(
  ConjugationsActionsType.FetchConjugations,
  props<{
    verbs: string,
    times: VerbTime[]
  }>()
);

export const fetchConjugationsSuccessAction = createAction(
  ConjugationsActionsType.FetchConjugationsSuccess,
  props<{
    verbs: VerbWithConjugations[],
  }>());

export const fetchConjugationsErrorAction = createAction(
  ConjugationsActionsType.FetchConjugationsError,
  props<{
    error: string
  }>()
);

export const fetchConjugationsFromCSVAction = createAction(
  ConjugationsActionsType.FetchConjugationsFromCSV,
  props<{
    file: File,
    times: VerbTime[]
  }>()
);

export const fetchConjugationsFromCSVSuccessAction = createAction(
  ConjugationsActionsType.FetchConjugationsFromCSVSuccess,
  props<{
    verbs: VerbWithConjugations[],
  }>()
);

export const fetchConjugationsFromCSVErrorAction = createAction(
  ConjugationsActionsType.FetchConjugationsFromCSVError,
  props<{
    error: string,
  }>()
);

export const selectConjugationsGroupAction = createAction(
  ConjugationsActionsType.SelectConjugationsGroup,
  props<{
    group: WordGroup
  }>()
);

export const addGroupToUserGroupsAction = createAction(
  ConjugationsActionsType.AddGroupToUserGroups,
  props<{
    name: string,
    isVerbsGroup?: boolean
  }>()
);

export const addGroupToUserGroupsSuccessAction = createAction(
  ConjugationsActionsType.AddGroupToUserGroupsSuccess,
  props<{
    groups: WordGroup[],
    group: WordGroup
  }>()
);

export const addGroupToUserGroupsErrorAction = createAction(
  ConjugationsActionsType.AddGroupToUserGroupsError,
  props<{
    error: string
  }>()
);

export const saveVerbsAction = createAction(
  ConjugationsActionsType.SaveVerbs,
);

export const saveVerbsSuccessAction = createAction(
  ConjugationsActionsType.SaveVerbsSuccess,
  props<{
    words: Word[],
    groups: WordGroup[]
  }>()
);

export const saveVerbsErrorAction = createAction(
  ConjugationsActionsType.SaveVerbsError,
  props<{
    error: string
  }>()
);

export const selectVerbForSavingAction = createAction(
  ConjugationsActionsType.SelectVerbForSaving,
  props<{
    verb: VerbWithConjugations
  }>()
);

export const selectVerbsForSavingToggleAction = createAction(
  ConjugationsActionsType.SelectVerbsForSavingToggle,
);

