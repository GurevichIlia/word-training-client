import { createAction, props } from '@ngrx/store';
import { Word } from 'src/app/shared/interfaces';
import { BackendErrorInterface } from './../../core/models/general.model';
import { WordGroup } from './../../shared/interfaces';

export enum VocabularyActionsType {
  // WORDS ACTIONS
  FetchWords = '[Vocabulary] fetch words',
  FetchWordsSuccess = '[Vocabulary] fetch words success',
  FetchWordsError = '[Vocabulary] fetch words error',

  AddWordToUserWords = '[Vocabulary] Add word to user Words',
  AddWordToUserWordsSuccess = '[Vocabulary] Add word to user Words success',
  AddWordToUserWordsError = '[Vocabulary] Add word to user Words error',

  SaveEditedWord = '[Vocabulary] Save edited word',
  SaveEditedWordSuccess = '[Vocabulary] Save edited word success',
  SaveEditedWordError = '[Vocabulary] Save edited word error',

  DeleteUserWord = '[Vocabulary] Delete user word',
  DeleteUserWordsuccess = '[Vocabulary] Delete user word success',
  DeleteUserWordError = '[Vocabulary] Delete user word error',

  DeleteUserWordFromGroup = '[Vocabulary] Delete user word from group',
  DeleteUserWordFromGroupsuccess = '[Vocabulary] Delete user word from group success',
  DeleteUserWordFromGroupError = '[Vocabulary] Delete user word from group error',

  SetWordAsFavorite = '[Vocabulary] Set word as favorite',
  SetWordAsFavoriteSuccess = '[Vocabulary] Set word as favorite success',
  SetWordAsFavoriteError = '[Vocabulary] Set word as favorite error',

  AddWordsFromCsv = '[Vocabulary] Add words from csv',
  AddWordsFromCsvSuccess = '[Vocabulary] Add words from csv success',
  AddWordsFromCsvError = '[Vocabulary] Add words from csv error',

  ShareWordToGeneralWords = '[Vocabulary] Add word to general words',
  ShareWordToGeneralWordsSuccess = '[Vocabulary] Add word to general words success',
  ShareWordToGeneralWordsError = '[Vocabulary] Add word to general words error',

  CsvHandlerToggle = '[Vocabulary] Csv handler toggle',

  OpenAssigningBottomSheet = '[Vocabulary] Open Assigning bottom sheet',
  CloseAssigningBottomSheet = '[Vocabulary] Close Assigning bottom sheet',

  SetWordsAndGroups = '[Vocabulary] Set words and groups',

  SelectVocabularyGroup = '[Vocabulary] Select vocabulary group',


  // GROUPS ACTIONS
  FetchGroups = '[Vocabulary] fetch Groups',
  FetchGroupsSuccess = '[Vocabulary] fetch Groups success',
  FetchGroupsError = '[Vocabulary] fetch Groups error',

  AddGroupToUserGroups = '[Vocabulary] Add Group to user Groups',
  AddGroupToUserGroupsSuccess = '[Vocabulary] Add Group to user Groups success',
  AddGroupToUserGroupsError = '[Vocabulary] Add Group to user Groups error',

  SaveEditedGroup = '[Vocabulary] Save edited Group',
  SaveEditedGroupsuccess = '[Vocabulary] Save edited Group success',
  SaveEditedGroupError = '[Vocabulary] Save edited Group error',

  DeleteUserGroup = '[Vocabulary] Delete user Group',
  DeleteUserGroupsuccess = '[Vocabulary] Delete user Group success',
  DeleteUserGroupError = '[Vocabulary] Delete user Group error',

  AssignWordsToGroup = '[Vocabulary] Assign words to group',
  AssignWordsToGroupSuccess = '[Vocabulary] Assign words to group success',
  AssignWordsToGroupError = '[Vocabulary] Assign words to group error',

  UpdateGroupsQuantityInGroup = '[Vocabulary] update Groups quantity in group',

  ShowVerbsToggle = '[Vocabulary] Show verbs for vocabulary toggle',

  UpdateGroups = '[Vocabulary] Update groups',
  UpdateWords = '[Vocabulary] Update words'

}
// WORDS ACTIONS
export const fetchWordsAction = createAction(VocabularyActionsType.FetchWords);
export const fetchWordsSuccessAction = createAction(VocabularyActionsType.FetchWordsSuccess, props<{ words: Word[] }>());
export const fetchWordsErrorAction = createAction(VocabularyActionsType.FetchWordsError, props<{ error: string }>());

export const addWordToUserWordsAction = createAction(VocabularyActionsType.AddWordToUserWords, props<{ word: Word }>());
export const addWordToUserWordsSuccessAction = createAction(VocabularyActionsType.AddWordToUserWordsSuccess,
  props<{ words: Word[], groups: WordGroup[] }>());
export const addWordToUserWordsErrorAction = createAction(VocabularyActionsType.AddWordToUserWordsError, props<{ error: string }>());

export const saveEditedWordAction = createAction(VocabularyActionsType.SaveEditedWord, props<{ word: Word }>());
export const saveEditedWordSuccessAction = createAction(VocabularyActionsType.SaveEditedWordSuccess, props<{ words: Word[] }>());
export const saveEditedWordErrorAction = createAction(VocabularyActionsType.SaveEditedWordError, props<{ error: string }>());

export const deleteUserWordAction = createAction(VocabularyActionsType.DeleteUserWord, props<{ word: Word }>());
export const deleteUserWordSuccessAction = createAction(VocabularyActionsType.DeleteUserWordsuccess,
  props<{ words: Word[], groups: WordGroup[] }>());
export const deleteUserWordErrorAction = createAction(VocabularyActionsType.DeleteUserWordError, props<{ error: string }>());

export const deleteUserWordFromGroupAction = createAction(VocabularyActionsType.DeleteUserWordFromGroup, props<{ word: Word, }>());
export const deleteUserWordFromGroupSuccessAction = createAction(VocabularyActionsType.DeleteUserWordFromGroupsuccess,
  props<{ words: Word[], groups: WordGroup[] }>());
export const deleteUserWordFromGroupErrorAction = createAction(VocabularyActionsType.DeleteUserWordFromGroupError,
  props<{ error: string }>());

export const setWordAsFavoriteAction = createAction(VocabularyActionsType.SetWordAsFavorite, props<{ word: Word }>());
export const setWordAsFavoriteSuccessAction = createAction(VocabularyActionsType.SetWordAsFavoriteSuccess);
export const setWordAsFavoriteErrorAction = createAction(VocabularyActionsType.SetWordAsFavoriteError,
  props<{ word: Word, error: BackendErrorInterface | string }>());

export const addWordsFromCsvAction = createAction(VocabularyActionsType.AddWordsFromCsv, props<{ file: File, selectedGroupId?: string }>());
export const addWordsFromCsvSuccessAction = createAction(VocabularyActionsType.AddWordsFromCsvSuccess,
  props<{ words: Word[], groups: WordGroup[] }>());
export const addWordsFromCsvErrorAction = createAction(VocabularyActionsType.AddWordsFromCsvError,
  props<{ error: BackendErrorInterface | string }>());

export const shareWordToGeneralWordsAction = createAction(VocabularyActionsType.ShareWordToGeneralWords, props<{ words: Word[] }>());
export const shareWordToGeneralWordsSuccessAction = createAction(VocabularyActionsType.ShareWordToGeneralWordsSuccess,
  props<{ words: Word[], message?: string }>());
export const shareWordToGeneralWordsErrorAction = createAction(VocabularyActionsType.ShareWordToGeneralWordsError,
  props<{ error: string }>());

export const csvHandlerToggleAction = createAction(VocabularyActionsType.CsvHandlerToggle);

export const openAssigningBottomSheetAction = createAction(VocabularyActionsType.OpenAssigningBottomSheet);
export const closeAssigningBottomSheetAction = createAction(VocabularyActionsType.CloseAssigningBottomSheet);

export const setWordsAndGroupsAction = createAction(VocabularyActionsType.SetWordsAndGroups,
  props<{ words: Word[], groups: WordGroup[] }>());

export const selectVocabularyGroupAction = createAction(VocabularyActionsType.SelectVocabularyGroup, props<{ group: WordGroup }>());

// GROUPS ACTIONS
export const fetchGroupsAction = createAction(VocabularyActionsType.FetchGroups);
export const fetchGroupsSuccessAction = createAction(VocabularyActionsType.FetchGroupsSuccess, props<{ groups: WordGroup[] }>());
export const fetchGroupsErrorAction = createAction(VocabularyActionsType.FetchGroupsError, props<{ error: BackendErrorInterface }>());

export const addGroupToUserGroupsAction = createAction(VocabularyActionsType.AddGroupToUserGroups, props<{ name: string }>());
export const addGroupToUserGroupsSuccessAction = createAction(VocabularyActionsType.AddGroupToUserGroupsSuccess,
  props<{ groups: WordGroup[], group: WordGroup }>());
export const addGroupToUserGroupsErrorAction = createAction(VocabularyActionsType.AddGroupToUserGroupsError, props<{ error: string }>());

export const saveEditedGroupAction = createAction(VocabularyActionsType.SaveEditedGroup, props<{ name: string }>());
export const saveEditedGroupSuccessAction = createAction(VocabularyActionsType.SaveEditedGroupsuccess,
  props<{ groups: WordGroup[], group: WordGroup }>());
export const saveEditedGroupErrorAction = createAction(VocabularyActionsType.SaveEditedGroupError, props<{ error: string }>());

export const deleteUserGroupAction = createAction(VocabularyActionsType.DeleteUserGroup);
export const deleteUserGroupSuccessAction = createAction(VocabularyActionsType.DeleteUserGroupsuccess, props<{ groups: WordGroup[] }>());
export const deleteUserGroupErrorAction = createAction(VocabularyActionsType.DeleteUserGroupError, props<{ error: string }>());

export const updateGroupsQuantityInGroupAction = createAction(VocabularyActionsType.UpdateGroupsQuantityInGroup,
  props<{ groupId: string, GroupsQuantity: number }>());

export const assignWordsToGroupAction = createAction(VocabularyActionsType.AssignWordsToGroup,
  props<{ selectedWordsIds: string[] }>());
export const assignWordsToGroupSuccessAction = createAction(VocabularyActionsType.AssignWordsToGroupSuccess,
  props<{ groups: WordGroup[], message: string, words: Word[] }>());
export const assignWordsToGroupErrorAction = createAction(VocabularyActionsType.AssignWordsToGroupError, props<{ error: string }>());

export const showVerbsInVocabularyToggleAction = createAction(VocabularyActionsType.ShowVerbsToggle);

export const updateGroupsAction = createAction(
  VocabularyActionsType.UpdateGroups,
  props<{ groups: WordGroup[] }>()
);

export const updateWordsAction = createAction(
  VocabularyActionsType.UpdateWords,
  props<{ words: Word[] }>()
);

