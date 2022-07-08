import { WordGroup } from 'src/app/shared/interfaces';
import { BuiltInGroupId } from '../enums/group.enum';

export const isBuiltInGroup = (group: WordGroup) => group._id === BuiltInGroupId.ALL_WORDS || group._id === BuiltInGroupId.FAVORITES;

export const filterGroupsForVerbs = (groups: WordGroup[]) => groups.filter(group => group.isVerbsGroup || isBuiltInGroup(group))