import { All, defaultGroups } from './../../core/models/groups.model';
import { updateWordsAction } from './../actions/vocabulary.actions';
import { DefaultGroupId } from './../../core/enums/group.enum';
import { addWordsFromCsvErrorAction, deleteUserWordFromGroupAction, deleteUserWordFromGroupErrorAction, deleteUserWordFromGroupSuccessAction, selectVocabularyGroupAction, updateGroupsAction } from 'src/app/store/actions/vocabulary.actions';
import { BackendErrorInterface } from './../../core/models/general.model';
import { Action, createReducer, on } from '@ngrx/store';
import { ReducerNode } from '../../core/enums/store.enum';
import {
  fetchGroupsAction,
  fetchGroupsSuccessAction,
  fetchGroupsErrorAction,
  addGroupToUserGroupsAction,
  addGroupToUserGroupsSuccessAction,
  addGroupToUserGroupsErrorAction,
  saveEditedGroupAction,
  saveEditedGroupSuccessAction,
  saveEditedGroupErrorAction, deleteUserGroupAction, deleteUserGroupSuccessAction, deleteUserGroupErrorAction,
  assignWordsToGroupAction, assignWordsToGroupSuccessAction, assignWordsToGroupErrorAction
} from '../actions/vocabulary.actions';

import {
  fetchWordsAction, fetchWordsSuccessAction,
  fetchWordsErrorAction, addWordToUserWordsAction, addWordToUserWordsSuccessAction, addWordToUserWordsErrorAction,
  addWordsFromCsvAction, addWordsFromCsvSuccessAction, csvHandlerToggleAction,
  saveEditedWordAction, saveEditedWordSuccessAction, saveEditedWordErrorAction, deleteUserWordAction,
  deleteUserWordSuccessAction, deleteUserWordErrorAction, setWordAsFavoriteAction,
  setWordAsFavoriteSuccessAction, setWordAsFavoriteErrorAction,
  shareWordToGeneralWordsAction, shareWordToGeneralWordsSuccessAction,
  shareWordToGeneralWordsErrorAction, setWordsAndGroupsAction, openAssigningBottomSheetAction, closeAssigningBottomSheetAction
} from '../actions/vocabulary.actions';
import { WordGroup, Word } from 'src/app/shared/interfaces';
import { showVerbsInVocabularyToggleAction } from '../actions/vocabulary.actions';

export const VOCABULARY_REDUCER_NODE: ReducerNode.VOCABULARY = ReducerNode.VOCABULARY

export interface VocabularyStateInterface {
  error: BackendErrorInterface | string,
  vocabularyLoader: boolean,
  vocabularyModalLoader: boolean,
  selectedGroup: WordGroup,
  csvLoader: boolean,
  isCloseModal: boolean,
  isCloseCsvHandler: boolean,
  isResetCsvHandler: boolean,
  isCloseBottomSheet: boolean,
  bottomSheetLoader: boolean;
  userGroups: WordGroup[] | null,
  userWords: Word[] | null,
  isVerbs: boolean
}


const initialState: VocabularyStateInterface = {
  error: null,
  selectedGroup: null,
  vocabularyLoader: false,
  vocabularyModalLoader: false,
  userGroups: null,
  userWords: null,
  isCloseBottomSheet: null,
  bottomSheetLoader: false,
  isCloseModal: false,
  csvLoader: false,
  isCloseCsvHandler: false,
  isResetCsvHandler: false,
  isVerbs: false

}

const reducers = createReducer(
  initialState,
  // WORDS ACTIONS
  on(
    fetchWordsAction,
    (state): VocabularyStateInterface => ({
      ...state,
      userWords: [],
      vocabularyLoader: true
    })
  ),
  on(
    fetchWordsSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyLoader: false,
      userWords: action.words
    })
  ),
  on(
    fetchWordsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyLoader: false,
      error: action.error
    })
  ),
  on(
    addWordToUserWordsAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,

      vocabularyModalLoader: true,
      error: null
    })
  ),
  on(
    addWordToUserWordsSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      isCloseModal: true,
      userWords: action.words,
      userGroups: action.groups
    })
  ),
  on(
    addWordToUserWordsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    addWordsFromCsvAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseCsvHandler: false,
      csvLoader: true,
      error: null
    })
  ),
  on(
    addWordsFromCsvSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      csvLoader: false,
      isResetCsvHandler: true,
      isCloseCsvHandler: true,
      userWords: [
        ...action.words
      ],
      userGroups: action.groups
    })
  ),
  on(
    addWordsFromCsvErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      csvLoader: false,
      error: action.error
    })
  ),
  on(
    csvHandlerToggleAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isResetCsvHandler: false,
      isCloseCsvHandler: !state.isCloseCsvHandler
    })
  ),
  on(
    addWordToUserWordsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      csvLoader: false,
      error: action.error
    })
  ),
  on(
    saveEditedWordAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      vocabularyModalLoader: true,
      error: null
    })
  ),
  on(
    saveEditedWordSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      isCloseModal: true,
      userWords: action.words
    })
  ),
  on(
    saveEditedWordErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    deleteUserWordAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      error: null
    })
  ),
  on(
    deleteUserWordSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      isCloseModal: true,
      userWords: action.words,
      userGroups: action.groups
    })
  ),
  on(
    deleteUserWordErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    deleteUserWordFromGroupAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      error: null
    })
  ),
  on(
    deleteUserWordFromGroupSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      isCloseModal: true,
      userWords: action.words,
      userGroups: action.groups
    })
  ),
  on(
    deleteUserWordFromGroupErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      error: action.error
    })
  ),
  on(
    setWordAsFavoriteAction,
    (state, action): VocabularyStateInterface => {
      const userWords = state.userWords.map(word => {
        if (word._id === action.word._id) {
          const newword = { ...word, isFavorite: !word.isFavorite }
          return newword
        }
        return word
      })
      return ({
        ...state,
        userWords,
        userGroups: state.userGroups.map(group => {
          if (group._id === DefaultGroupId.FAVORITES) {
            return { ...group, wordQuantity: userWords.filter(word => word.isFavorite === true).length }
          }

          return group
        })
      }
      )
    }
  ),
  on(
    setWordAsFavoriteSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
    })
  ),
  on(
    setWordAsFavoriteErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      userWords: state.userWords.map(word =>
        word._id === action.word._id
          ? { ...word, isFavorite: !word.isFavorite } :

          word
      ),
      error: action.error
    })
  ),
  on(
    shareWordToGeneralWordsAction,
    (state, action): VocabularyStateInterface =>
    ({
      ...state,
      vocabularyLoader: true

    })
  ),
  on(
    shareWordToGeneralWordsSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyLoader: false,
      userWords: action.words
    })
  ),
  on(
    shareWordToGeneralWordsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyLoader: false,
      error: action.error
    })
  ),
  on(
    setWordsAndGroupsAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      userWords: action.words ? action.words : state.userWords,
      userGroups: action.groups ? action.groups : state.userGroups

    })
  ),
  on(
    updateGroupsAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      userGroups: action.groups

    })
  ),
  // GROUPS ACTIONS
  on(
    fetchGroupsAction,
    (state): VocabularyStateInterface => ({
      ...state,
      userGroups: [],
      vocabularyLoader: true
    })
  ),
  on(
    fetchGroupsSuccessAction,
    (state, action): VocabularyStateInterface => {
      const selectedGroup = state.selectedGroup ? state.selectedGroup : action.groups[0]
      return {
        ...state,
        vocabularyLoader: false,
        selectedGroup,
        userGroups: [...action.groups]

      }
    }),
  on(
    fetchGroupsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyLoader: false,
      error: action.error
    })
  ),
  on(
    addGroupToUserGroupsAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      vocabularyModalLoader: true,
      error: null
    })
  ),
  on(
    addGroupToUserGroupsSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      isCloseModal: true,
      userGroups: [...action.groups]
    })
  ),
  on(
    addGroupToUserGroupsErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    saveEditedGroupAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      vocabularyModalLoader: true,
      error: null
    })
  ),
  on(
    saveEditedGroupSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      isCloseModal: true,
      userGroups: [...action.groups]
    })
  ),
  on(
    saveEditedGroupErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    deleteUserGroupAction,
    (state): VocabularyStateInterface => ({
      ...state,
      isCloseModal: false,
      vocabularyModalLoader: true,
      error: null
    })
  ),
  on(
    deleteUserGroupSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      isCloseModal: true,
      userGroups: [...action.groups],
    })
  ),
  on(
    deleteUserGroupErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      vocabularyModalLoader: false,
      error: action.error
    })
  ),
  on(
    assignWordsToGroupAction,
    (state): VocabularyStateInterface => ({
      ...state,
      bottomSheetLoader: true,
      error: null
    })
  ),
  on(
    assignWordsToGroupSuccessAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      userWords: [...action.words],
      userGroups: [...action.groups],
      bottomSheetLoader: false,
    })
  ),
  on(
    assignWordsToGroupErrorAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      bottomSheetLoader: false,
      error: action.error
    })
  ),
  on(
    openAssigningBottomSheetAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      isCloseBottomSheet: false
    })
  ),
  on(
    closeAssigningBottomSheetAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      isCloseBottomSheet: true
    })
  ),
  on(
    selectVocabularyGroupAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      selectedGroup: action.group
    })
  ),
  on(
    showVerbsInVocabularyToggleAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      selectedGroup: defaultGroups[All],
      isVerbs: !state.isVerbs
    })
  ),
  on(
    updateWordsAction,
    (state, action): VocabularyStateInterface => ({
      ...state,
      userWords: action.words

    })
  ),


)

export function vocabularyReducer(state: VocabularyStateInterface, action: Action) {
  return reducers(state, action)
}

