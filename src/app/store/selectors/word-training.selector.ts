import { IWordTrainingState } from 'src/app/core/models/word-training.interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppStateInterface } from '../reducers'
import { WORD_TRAINING_REDUCER_NODE } from '../reducers/word-training.reducer'

export type IConfigData = Pick<IWordTrainingState, 'uniqueLearnedWords' | 'allLearnedCardsQuantity' | 'selectedGroup' | 'isStarted'>

const featureSelector = createFeatureSelector<AppStateInterface, IWordTrainingState>(WORD_TRAINING_REDUCER_NODE)

export const configDataSelector = createSelector(
  featureSelector,
  state => {
    const config: IConfigData = {
      allLearnedCardsQuantity: state.allLearnedCardsQuantity,
      selectedGroup: state.selectedGroup,
      isStarted: state.isStarted,
      uniqueLearnedWords: state.uniqueLearnedWords
    }
    return config
  }
)

export const isTrainStartedSelector = createSelector(
  featureSelector,
  state => state.isStarted
)

export const learningWordSelector = createSelector(
  featureSelector,
  state => state.nextWord
)

export const uniqueLearnedWordsQuantitySelector = createSelector(
  featureSelector,
  state => state.uniqueLearnedWords.size
)

export const allLearnedCardsQuantitySelector = createSelector(
  featureSelector,
  state => state.allLearnedCardsQuantity
)

export const wordsQuantitySelector = createSelector(
  featureSelector,
  state => state.words.length
)

export const wordsByGroup = createSelector(
  featureSelector,
  state => state.words.length
)

export const uniqueLearnedWordsSelector = createSelector(
  featureSelector,
  state => [...state.uniqueLearnedWords.values()]
)

export const wordsToSaveSelector = createSelector(
  featureSelector,
  state => [...state.newWordsLearnedInTrain.values()]
)

export const isShowPreviousWordButtonSelector = createSelector(
  featureSelector,
  state => state.previousWordsInCache.length > 0 ? true : false
)

export const isShowOnlyVerbsSelector = createSelector(
  featureSelector,
  state => state.isVerbs
)

export const hebrewVerbTimeSelector = createSelector(
  featureSelector,
  state => state.hebrewVerbTime
)

