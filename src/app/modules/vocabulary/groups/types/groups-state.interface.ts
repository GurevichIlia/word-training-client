import { Word, WordGroup } from 'src/app/shared/interfaces';

export interface GroupsStateInterface {
  selectedGroup: WordGroup,
}

export interface ISaveGroupResponse {
  groups: WordGroup[]
  group: WordGroup;
}

export interface IAssignWordsResponse {
  groups: WordGroup[],
  wordsAfterAssign: Word[],
  message: string
}
export interface IDeleteGroupResponse extends ISaveGroupResponse { }
