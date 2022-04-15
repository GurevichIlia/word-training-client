import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { WordGroup } from 'src/app/shared/interfaces';
import { ApiService } from '../../../../core/services/api.service';
import { BASE_URL } from '../../../../shared/services/api/api-languages.service';
import { IAssignWordsResponse, IDeleteGroupResponse, ISaveGroupResponse } from '../types/groups-state.interface';

@Injectable({ providedIn: 'root' })
export class GroupsApiService {

  constructor(private http: ApiService) {

  }

  saveGroup(name: string, id: string = '', isVerbsGroup: boolean = false) {
    return this.http.post<ISaveGroupResponse>(`${BASE_URL}/api/word-group/create`, { group: { name, id, isVerbsGroup } });
  }

  deleteWordGroup(groupId: string) {
    return this.http.post<IDeleteGroupResponse>(`${BASE_URL}/api/word-group/deleteGroup`, { groupId });

  }

  assignGroup(groupId: string, selectedWords: string[]): Observable<IAssignWordsResponse> {
    return this.http.post<IAssignWordsResponse>(`${BASE_URL}/api/word-group/assign-group`, { groupId, selectedWords });
  }

  getAllWordsGroups(language: LanguageInterface) {
    return this.http.get<WordGroup[]>(`${BASE_URL}/api/word-group/getAllGroups?languageId=${language._id}`);
  }

  addMyWords() {
    return this.http.get<WordGroup[]>(`${BASE_URL}/api/vocabulary/addMyWords`);
  }
}
