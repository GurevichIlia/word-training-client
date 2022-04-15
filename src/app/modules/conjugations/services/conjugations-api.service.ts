import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { GetConjugationsResponse, SaveVerbsRequestData, SaveVerbsResponse, VerbTime } from '../models/conjugations.interface';

@Injectable({
  providedIn: 'root'
})
export class ConjugationsApiService {

  constructor(private apiService: ApiService) { }


  public getConjugationsForVerbs(verbs: string[], times: VerbTime[]): Observable<GetConjugationsResponse> {
    return this.apiService.post(`/api/vocabulary/getConjugationForVerbs`, { verbs, times });
  }

  public getConjugationsForVerbsViaCSV(csvFile: FormData, times: VerbTime[]): Observable<GetConjugationsResponse> {
    const headers = new HttpHeaders();
    const params = new HttpParams()
      .append('times', JSON.stringify(times));
    headers.append('enctype', 'text/csv');
    const options = {
      header: headers,
      params,
    };
    return this.apiService.post(`/api/vocabulary/getConjugationForVerbFromCSV`, csvFile, options);
  }

  public saveVerbs(verbs: SaveVerbsRequestData[], assignedGroups: string[]): Observable<SaveVerbsResponse> {
    return this.apiService.post(`/api/vocabulary/saveVerbs`, { verbs, assignedGroups });
  }
}
