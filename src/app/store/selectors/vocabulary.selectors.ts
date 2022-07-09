import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuItem, WordAction, wordMenuItems } from 'src/app/core';
import { filterWordsByGroup } from 'src/app/core/utils/filter-words-by-group';
import { GroupsUtils } from 'src/app/core/utils/groups.utils';
import { VocabularyViewModel } from 'src/app/shared/interfaces';
import { AppStateInterface } from 'src/app/store/reducers';
import { VocabularyStateInterface, VOCABULARY_REDUCER_NODE } from '../reducers/vocabulary.reducers';
import { All } from './../../core/models/groups.model';

const featureSelector = createFeatureSelector<AppStateInterface, VocabularyStateInterface>(VOCABULARY_REDUCER_NODE)

export const modalLoaderSelector = createSelector(
  featureSelector,
  state => state.vocabularyModalLoader
)

export const vocabularyLoaderSelector = createSelector(
  featureSelector,
  state => state.vocabularyLoader
)

export const isCloseModalSelector = createSelector(
  featureSelector,
  state => state.isCloseModal
)

export const errorSelector = createSelector(
  featureSelector,
  state => state.error
)

export const allWordsSelector = createSelector(
  featureSelector,
  state => state.userWords
)

export const allGroupsSelector = createSelector(
  featureSelector,
  state => state.userGroups
)

export const allWordsQuantitySelector = createSelector(
  featureSelector,
  state => state.userWords?.length
)

export const csvLoaderSelector = createSelector(
  featureSelector,
  state => state.csvLoader
)

export const isCloseCsvHandlerSelector = createSelector(
  featureSelector,
  state => state.isCloseCsvHandler
)

export const isResetCsvHandlerSelector = createSelector(
  featureSelector,
  state => state.isResetCsvHandler
)

export const isCloseWordsToAssignSelector = createSelector(
  featureSelector,
  state => state.isCloseBottomSheet === true ? true : null
)

export const isOpenWordsToAssignSelector = createSelector(
  featureSelector,
  state => state.isCloseBottomSheet === false ? true : state.isCloseBottomSheet === true ? false : null
)

export const isBottomSheetLoadingSelector = createSelector(
  featureSelector,
  state => state.bottomSheetLoader
)


export const isShowOnlyVerbsInVocabularySelector = createSelector(
  featureSelector,
  state => state.isVerbs
)

export const selectExistingVerbs = createSelector(
  allWordsSelector,
  (words) => words?.filter(word => word.isVerb)
)

export const vocabularyVM = createSelector(
  featureSelector,
  ({ isVerbs, userGroups, userWords, ...state }): VocabularyViewModel => {

    if (!userGroups || !userWords) return

    const selectedGroup = state.selectedGroup ?? userGroups[All]

    const words = userWords.filter(word => isVerbs ? word.isVerb : word)

    const wordsFilteredByGroup = filterWordsByGroup(selectedGroup, words)

    const groups = GroupsUtils.getGroupsForView({
      words: userWords,
      isVerbs,
      groups: userGroups
    })

    return {
      words: wordsFilteredByGroup,
      groups,
      selectedGroup: GroupsUtils.findSelectedGroup(groups, selectedGroup)
    }
  }
)

export const selectedGroupSelector = createSelector(
  vocabularyVM,
  (viewModel) => viewModel?.selectedGroup
)

export const selectWordsForVocabulary = createSelector(
  vocabularyVM,
  (viewModel) => viewModel?.words
)

export const selectGroupsForVocabulary = createSelector(
  vocabularyVM,
  (viewModel) => viewModel?.groups
)

export const selectWordMenu = createSelector(
  selectedGroupSelector,
  (selectedGroup): MenuItem<WordAction>[] => {

    if (!selectedGroup) return []

    if (GroupsUtils.isBuiltInGroup(selectedGroup)) {
      return wordMenuItems.filter(item => item.action !== WordAction.DELETE_FROM_GROUP)
    }

    return wordMenuItems
  }
)

