import { Action, createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core';
import { ReducerNode } from 'src/app/core/enums/store.enum';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { deleteGeneralWordAction, deleteGeneralWordErrorAction, deleteGeneralWordSuccessAction,
   fetchGeneralWordsAction,
    fetchGeneralWordsErrorAction, fetchGeneralWordsSuccessAction } from '../actions/general-words.actions';
// import { updateGroupsAndWordsAction } from '../actions/general.actions';
import {
  getCurrentLearningLanguageErrorAction,
  getCurrentLearningLanguageSuccessAction,
  getLearningLanguageAction,
  setCurrentLanguageAction
} from '../actions/languages.actions';


export const GENERAL_REDUCER_NODE: ReducerNode.GENERAL_STATE = ReducerNode.GENERAL_STATE

export interface GeneralStateInterface {
  error: BackendErrorInterface | string | null,
  globalLoader: boolean,
  currentLanguage: LanguageInterface | null,

  isUpdateGroupsAndWords: boolean,
}

const initialState: GeneralStateInterface = {
  error: null,
  globalLoader: false,
  currentLanguage: null,
  isUpdateGroupsAndWords: false
}

export const reducer = createReducer(
  initialState,
  // GENERAL ACTIONS
  // on(
  //   updateGroupsAndWordsAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     isUpdateGroupsAndWords: action.isUpdate
  //   })
  // ),
  // LEARNING LANGUAGE ACTIONS
  on(
    getLearningLanguageAction,
    (state): GeneralStateInterface => ({
      ...state,
    })),
  on(
    getCurrentLearningLanguageSuccessAction,
    (state, action): GeneralStateInterface => ({
      ...state,
      currentLanguage: action.currentLanguage
    })),
  on(
    getCurrentLearningLanguageErrorAction,
    (state, action): GeneralStateInterface => ({
      ...state,
      error: action.error
    })),
  on(
    setCurrentLanguageAction,
    (state, action): GeneralStateInterface => ({
      ...state,
      currentLanguage: action.language
    })),
  // // WORDS ACTIONS
  // on(
  //   fetchWordsAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     userWords: [],
  //     globalLoader: true
  //   })
  // ),
  // on(
  //   fetchWordsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     userWords: action.words
  //   })
  // ),
  // on(
  //   fetchWordsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   addWordToUserWordsAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,

  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   addWordToUserWordsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userWords: action.words
  //   })
  // ),
  // on(
  //   addWordToUserWordsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   addWordsFromCsvAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     csvLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   addWordsFromCsvSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     csvLoader: false,
  //     isResetCsvHandler: true,
  //     isCloseCsvHandler: true,
  //     userWords: [
  //       ...action.words
  //     ]
  //   })
  // ),
  // on(
  //   csvHandlerToggleAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isResetCsvHandler: false,
  //     isCloseCsvHandler: !state.isCloseCsvHandler
  //   })
  // ),
  // on(
  //   addWordToUserWordsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     csvLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   saveEditedWordAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,
  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   saveEditedWordSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userWords: action.words
  //   })
  // ),
  // on(
  //   saveEditedWordErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   deleteUserWordAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,
  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   deleteUserWordSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userWords: action.words,
  //   })
  // ),
  // on(
  //   deleteUserWordErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   setWordAsFavoriteAction,
  //   (state, action): GeneralStateInterface => {
  //     return ({
  //       ...state,
  //       userWords: state.userWords.map(word => {
  //         if (word._id === action.word._id) {
  //           const newword = { ...word, isFavorite: !word.isFavorite }
  //           return newword
  //         }

  //         return word
  //       })
  //     }
  //     )
  //   }
  // ),
  // on(
  //   setWordAsFavoriteSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state
  //   })
  // ),
  // on(
  //   setWordAsFavoriteErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     userWords: state.userWords.map(word =>
  //       word._id === action.word._id
  //         ? { ...word, isFavorite: !word.isFavorite } :

  //         word
  //     ),
  //     error: action.error
  //   })
  // ),
  // on(
  //   shareWordToGeneralWordsAction,
  //   (state, action): GeneralStateInterface =>
  //     ({
  //       ...state,
  //       globalLoader: true

  //     })
  // ),
  // on(
  //   shareWordToGeneralWordsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false
  //   })
  // ),
  // on(
  //   shareWordToGeneralWordsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   setWordsAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     userWords: action.words

  //   })
  // ),
  // // GROUPS ACTIONS
  // on(
  //   fetchGroupsAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: true
  //   })
  // ),
  // on(
  //   fetchGroupsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     userGroups: [...action.groups]
  //   })
  // ),
  // on(
  //   fetchGroupsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   addGroupToUserGroupsAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,
  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   addGroupToUserGroupsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userGroups: [...action.groups]
  //   })
  // ),
  // on(
  //   addGroupToUserGroupsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   saveEditedGroupAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,
  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   saveEditedGroupSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userGroups: [...action.groups]
  //   })
  // ),
  // on(
  //   saveEditedGroupErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   deleteUserGroupAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     isCloseModal: false,
  //     modalLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   deleteUserGroupSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     isCloseModal: true,
  //     userGroups: [...action.groups],
  //   })
  // ),
  // on(
  //   deleteUserGroupErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     modalLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   assignWordsToGroupAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     bottomSheetLoader: true,
  //     error: null
  //   })
  // ),
  // on(
  //   assignWordsToGroupSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     userWords: [...action.words],
  //     userGroups: [...action.groups],
  //     bottomSheetLoader: false,
  //   })
  // ),
  // on(
  //   assignWordsToGroupErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     bottomSheetLoader: false,
  //     error: action.error
  //   })
  // ),
  // on(
  //   openAssigningBottomSheetAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     isCloseBottomSheet: false
  //   })
  // ),
  // on(
  //   closeAssigningBottomSheetAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     isCloseBottomSheet: true
  //   })
  // ),

  // // LEARNING LANGUAGE ACTIONS
  // on(
  //   getLearningLanguageAction,
  //   (state): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: true
  //   })),
  // on(
  //   getCurrentLearningLanguageSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     currentLanguage: action.currentLanguage
  //   })),
  // on(
  //   getCurrentLearningLanguageErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     error: action.error
  //   })),
  // on(
  //   setCurrentLanguageAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     userWords: [],
  //     userGroups: [],
  //     currentLanguage: action.language
  //   })),

  // GENERAL WORDS

  // on(
  //   fetchGeneralWordsAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     generalWords: null,
  //     globalLoader: true,
  //   })
  // ),
  // on(
  //   fetchGeneralWordsSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,
  //     generalWords: action.words
  //   })
  // ),
  // on(
  //   fetchGeneralWordsErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,
  //     globalLoader: false,

  //   })
  // ),
  // on(
  //   deleteGeneralWordAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,

  //   })
  // ),
  // on(
  //   deleteGeneralWordSuccessAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,

  //   })
  // ),
  // on(
  //   deleteGeneralWordErrorAction,
  //   (state, action): GeneralStateInterface => ({
  //     ...state,

  //   })
  // ),

)

export const generalReducer = (state: GeneralStateInterface, action: Action) => {
  return reducer(state, action)
}
