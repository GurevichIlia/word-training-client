import { Word, WordGroup } from './../../shared/interfaces';
export function getWordQuantity(groups: WordGroup[], words: Word[]): WordGroup[] {

  return groups?.map(group => {
    const FAVORITES = '2'
    if (group?._id === FAVORITES) {
      return {
        ...group,
        wordQuantity: words.filter(word => word.isFavorite).length
      }
    }

    return {
      ...group,
      wordQuantity: words?.filter(word => word.assignedGroups.includes(group?._id.toString())).length
    }
  }
  )
}
