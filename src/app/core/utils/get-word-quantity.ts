import { Word, WordGroup } from './../../shared/interfaces';
export function getWordQuantity(groups: WordGroup[], words: Word[], isVerbs: boolean): WordGroup[] {
  const filteredWords = words?.filter(word => isVerbs ? word.isVerb : word)

  return groups?.map(group => {
    const FAVORITES = '2'
    if (group._id === FAVORITES) {
      return {
        ...group,
        wordQuantity: filteredWords.filter(word => word.isFavorite).length
      }
    }

    return {
      ...group,
      wordQuantity: filteredWords.filter(word => word.assignedGroups.includes(group._id.toString())).length
    }
  }
  )
}
