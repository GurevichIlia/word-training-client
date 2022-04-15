import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {
  AddUserWordResponseInterface,
  AddWordsFromCsvResponseInterface,
  DeleteUserWordResponseInterface,
  EditUserWordResponseInterface,
  GetAllUserWordsResponseInterface,
  IAddWordToGeneralListResponse,
  UpdateWordsResponseInterface
} from 'src/app/core/models/words.interface';
import { GeneralWord, IDeleteGeneralWordResponse } from 'src/app/modules/general-words/types/general-words.interfaces';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { Word } from '../../interfaces';
import { ApiService } from './../../../core/services/api.service';
import { BASE_URL } from './api-languages.service';

@Injectable({
  providedIn: 'root'
})
export class ApiWordsService {

  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) { }

  getWordsFromServerForUser(langId: string): Observable<GetAllUserWordsResponseInterface> {
    return this.http.get<GetAllUserWordsResponseInterface>(`${BASE_URL}/api/vocabulary/getAllWords?languageId=${langId}`);
  }

  getGeneralWordsForAll(): Observable<GeneralWord[]> {
    return this.http.get<GeneralWord[]>(`${BASE_URL}/api/vocabulary/getGeneralWords`)
      .pipe(shareReplay());
  }

  addWord(word: Partial<Word>, language: LanguageInterface): Observable<AddUserWordResponseInterface> {

    return this.http.post<AddUserWordResponseInterface>(`${BASE_URL}/api/vocabulary/createWord?languageId=${language._id}`, word);
  }

  // addWords(words: Word[]): Observable<Word> {

  //   return this.http.post<Word>(`${BASE_URL}/api/vocabulary/addWords`, { words });
  // }

  editWord(word: Word, language?: LanguageInterface): Observable<EditUserWordResponseInterface> {

    return this.http.patch<EditUserWordResponseInterface>(`${BASE_URL}/api/vocabulary/editWord`, word);
  }

  deleteWordFromServer(wordId: string): Observable<DeleteUserWordResponseInterface> {

    return this.http.delete<DeleteUserWordResponseInterface>(`${BASE_URL}/api/vocabulary/deleteWord/${wordId}`);
  }

  updateWords(words: Word[]): Observable<UpdateWordsResponseInterface> {
    return this.http.post<UpdateWordsResponseInterface>(`${BASE_URL}/api/vocabulary/updateWords`, { words });

  }

  addWordsToGeneralList(words: Word[]): Observable<IAddWordToGeneralListResponse> {
    return this.http.post<IAddWordToGeneralListResponse>(`${BASE_URL}/api/vocabulary/addWordsToGeneralList`, { words });
  }

  deleteWordFromGeneralList(wordId: string): Observable<IDeleteGeneralWordResponse> {
    // tslint:disable-next-line: max-line-length
    return this.http.delete<IDeleteGeneralWordResponse>(`${BASE_URL}/api/vocabulary/deleteWordFromGeneralList?wordId=${wordId}`);
  }

  getUserId() {
    return this.http.get<{ userId: string }>(`${BASE_URL}/api/auth/getUserId`);
  }

  addWordsFromCSV(csvFile: any, assignedGroups?: string): Observable<AddWordsFromCsvResponseInterface> {
    const headers = new HttpHeaders();
    const params = new HttpParams();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('enctype', 'text/csv');
    const options = {
      header: headers,
      params,
    };
    return this.api.post<AddWordsFromCsvResponseInterface>(`${BASE_URL}/api/vocabulary/addWordsFromCSV?assignedGroups=${assignedGroups}`,
      csvFile, options);

  }
}
