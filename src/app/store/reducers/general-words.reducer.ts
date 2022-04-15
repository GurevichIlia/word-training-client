import { Action, createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core';
import { ReducerNode } from 'src/app/core/enums/store.enum';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import {
  deleteGeneralWordAction,
  deleteGeneralWordErrorAction,
  deleteGeneralWordSuccessAction,
  fetchGeneralWordsAction,
  fetchGeneralWordsErrorAction,
  fetchGeneralWordsSuccessAction
} from '../actions/general-words.actions';

export interface IGeneralWordsState {
  error: BackendErrorInterface | string | null,
  generalWords: GeneralWord[] | null,
  isLoading: boolean

}
const initialState: IGeneralWordsState = {
  error: null,
  generalWords: null,
  isLoading: false
}

export const GENERAL_WORDS_REDUCER_NODE: ReducerNode.GENERAL_WORDS = ReducerNode.GENERAL_WORDS

export const reducer = createReducer(
  initialState,
  on(
    fetchGeneralWordsAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      generalWords: null,
      isLoading: true,
    })
  ),
  on(
    fetchGeneralWordsSuccessAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      isLoading: false,
      generalWords: action.words
    })
  ),
  on(
    fetchGeneralWordsErrorAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      isLoading: false,

    })
  ),
  on(
    deleteGeneralWordAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      isLoading: true

    })
  ),
  on(
    deleteGeneralWordSuccessAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      isLoading: false,
      generalWords: action.words
    })
  ),
  on(
    deleteGeneralWordErrorAction,
    (state, action): IGeneralWordsState => ({
      ...state,
      isLoading: false

    })
  ),

)

export const generalWordsReducer = (state: IGeneralWordsState, action: Action) => {
  return reducer(state, action)
}
