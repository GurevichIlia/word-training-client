import { Injectable } from '@angular/core';
import { GroupsApiService } from 'src/app/modules/vocabulary/groups/services/groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignWordsService {
  constructor(private groupsApi: GroupsApiService) { }

  selectWordForAssign(wordId: string, selectedWords: string[]) {
    let words = [...selectedWords];


    if (words.includes(wordId)) {
      words = words.filter(id => id !== wordId);
    } else {
      words.push(wordId);
    }
    return words;

  }

  assignWords(groupId: string, selectedWordsIds: string[]) {
    return this.groupsApi.assignGroup(groupId, selectedWordsIds);
  }

}
