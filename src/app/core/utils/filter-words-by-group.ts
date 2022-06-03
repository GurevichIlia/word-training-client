import { WordGroup, Word } from 'src/app/shared/interfaces';
import { DefaultGroupId } from '../enums';

export const filterWordsByGroup = (selectedGroup: WordGroup, words: Word[]): Word[] => {

  if (!selectedGroup) return words

  if (selectedGroup._id === DefaultGroupId.ALL_WORDS) {

    return words;

  }

  if (selectedGroup._id === DefaultGroupId.FAVORITES) {

    return filterWordsByFavorite(words);

  }

  return words.filter(word => word.assignedGroups.includes(selectedGroup._id))

}

export const filterWordsByFavorite = (allWords: Word[]): Word[] => {
  return allWords.filter(word => word.isFavorite)
}
