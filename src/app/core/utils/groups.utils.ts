import { Word, WordGroup } from 'src/app/shared/interfaces';
import { BuiltInGroupId } from '../enums/group.enum';

export interface IGetGroupsForViewConfig {
  groups: WordGroup[];
  isVerbs: boolean;
  words: Word[]
}

export class GroupsUtils {

  public static isBuiltInGroup(group: WordGroup): boolean {
    return group._id === BuiltInGroupId.ALL_WORDS || group._id === BuiltInGroupId.FAVORITES
  }

  public static getGroupsForVerbs(groups: WordGroup[]): WordGroup[] {
    return groups.filter(group => group.isVerbsGroup || this.isBuiltInGroup(group))
  }

  public static getWordsQuantity(groups: WordGroup[], words: Word[]): WordGroup[] {

    return groups?.map(group => {
      if (group?._id === BuiltInGroupId.FAVORITES) {
        return {
          ...group,
          wordQuantity: words.filter(word => word.isFavorite).length
        }
      }

      return {
        ...group,
        wordQuantity: words?.filter(word => word.assignedGroups.includes(group?._id.toString())).length
      }
    })
  }

  public static getGroupsForView(config: IGetGroupsForViewConfig): WordGroup[] {

    const { groups, isVerbs, words } = config || {}

    if (!groups || !words) return []

    const filteredWords = words.filter(word => isVerbs ? word.isVerb : word)

    const currentGroups = isVerbs ? GroupsUtils.getGroupsForVerbs(groups) : groups

    return GroupsUtils.getWordsQuantity(currentGroups, filteredWords)

  }

  public static findSelectedGroup(groups: WordGroup[], selectedGroup: WordGroup): WordGroup {
    return groups.find(group => group._id === selectedGroup._id)
  }
}
