import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core';
import { FetchVerbsResponseData } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class ApiVerbsService {
  constructor(
    private api: ApiService,
  ) { }

  fetchVerbs(): Observable<FetchVerbsResponseData> {
    return this.api.get<FetchVerbsResponseData>(`/api/vocabulary/getVerbs`);

  }
}
