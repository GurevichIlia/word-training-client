import { WordAction } from '../../core/enums/word.enum';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap, shareReplay } from 'rxjs/operators';
import { Action } from 'src/app/core';
import { sharedWordMenuItem } from 'src/app/core/models/shared-word.model';
import { GeneralWordsFacade } from './general-words.facade';

import { GeneralWord } from './types/general-words.interfaces';

@Component({
  selector: 'app-general-words',
  templateUrl: './general-words.component.html',
  styleUrls: ['./general-words.component.scss']
})
export class GeneralWordsComponent implements OnInit {
  generalWords$: Observable<GeneralWord[]>;
  wordMenuItems = sharedWordMenuItem;
  filterControl = new FormControl('');
  userId$: Observable<string>;
  isLoading$: Observable<boolean>
  constructor(
    private generalWordsFacade: GeneralWordsFacade,


  ) { }

  ngOnInit() {
    this.generalWordsFacade.fetchGeneralWords()


    this.userId$ = this.generalWordsFacade.userId$;
    this.generalWords$ = this.generalWordsFacade.generalWords$.pipe(shareReplay())
    this.isLoading$ = this.generalWordsFacade.isLoading$
  }



  getActionFromChildren(event: Action<GeneralWord>) {

    switch (event.action) {
      case WordAction.ADD_TO_MY_WORDS: this.addWordToMyWords(event.payload);
        break;
      case WordAction.DELETE_FROM_SHARE_LIST: this.generalWordsFacade.deleteWordFromGeneralList(event.payload);
        break;
      default:
        break;
    }
  }


  addWordToMyWords(word: GeneralWord) {
    this.generalWordsFacade.addWordToMyWords(word)
  }

}
