import { VerbWithConjugations, VerbWithConjugationsFromServer } from './../../modules/conjugations/models/conjugations.interface';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Word, WordGroup } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class UtilsService {


  trackBy(index, word: Word) {
    if (!word) {
      return null;
    } else {
      return word._id;
    }
  }

  filterByGroup(words$: Observable<Word[]>, group$: Observable<WordGroup>): Observable<Word[]> {
    return combineLatest([
      words$,
      group$
    ]).pipe(
      map(([words, group]) => {
        return this.filter(words, group)
      })
    )
  }

  private isFavoriteWords(group: WordGroup): boolean {
    return group._id === '2'
  }

  filter(words: Word[], selectedGroup: WordGroup): Word[] {
    if (words && selectedGroup) {

      if (this.isFavoriteWords(selectedGroup)) {
        return words.filter(word => word.isFavorite)
      }
      return words.filter(word => word.assignedGroups.includes(selectedGroup._id))

    }
    return []
  }

  verbsForConjugationsParser(verbsAsString: string): string[] {

    const verbs: string[] = verbsAsString.split(';')
    const uniq: Set<string> = new Set(verbs)
    const uniqVerbs = Array.from(uniq.values())
      .filter(verb => Boolean(verb))
      .map(verb => verb.trim())

    return uniqVerbs
  }

  convertVerbsFromServerToCorrectFormat(verbs: VerbWithConjugationsFromServer[]): VerbWithConjugations[] {

    return verbs.map(verb => ({ ...verb, selected: true }))
  }

}

