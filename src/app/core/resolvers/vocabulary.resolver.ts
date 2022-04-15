import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { VocabularyFacade } from './../../modules/vocabulary/vocabulary.facade';
@Injectable()
export class VocabularyResolver implements Resolve<string> {
  constructor(private vocabularyFacade: VocabularyFacade) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<string> {
    this.vocabularyFacade.fetchWordsAndGroups()
    return of('fetched')
  }
}
