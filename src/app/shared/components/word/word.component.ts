import { environment } from 'src/environments/environment';
import { WordAction } from '../../../core/enums/word.enum';
import {
  ChangeDetectionStrategy, Component,
  EventEmitter, Input, OnInit,
  Output
} from '@angular/core';
import { Action, MenuItem, wordMenuItems } from 'src/app/core';
import { Word } from 'src/app/shared/interfaces';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { Languages } from 'src/app/core/enums/languages.enum';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';
import { wordCardColors } from 'src/app/core/enums/knowledge-level.enum';


@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordComponent {
  wordAction = WordAction;
  _menuItems: MenuItem<WordAction>[] = []
  @Input() word: Word | GeneralWord;
  @Input() isShowMenu = true;
  @Input() isShowDefaultOptions = true;
  @Input() userId: string;
  @Output() action = new EventEmitter<Action>();
  @Input() set menuItems(items: MenuItem<WordAction>[]) {
    // Check if word is GeneralWord
    if ('user' in this.word) {
      if (this.isAdmin()) {
        this._menuItems = items
        return
      }

      if (this.wordAddedByCurrentUser(this.word, this.userId)) {
        this._menuItems = this.hideAddWordButton(items)
      } else {
        this._menuItems = this.hideDeleteWordButton(items)
      }


    }
  };

  // public readonly showRtl$: Observable<boolean> = this.store.select(currentLanguageSelector).pipe(
  //   filter(language => language?.name === Languages.Hebrew),
  //   mapTo(true)
  // )

  public readonly wordCardColors$ = of(wordCardColors)

  constructor(private store: Store) { }

  dispatchAction(action: string, payload?: any) {
    this.action.emit({ action, payload });
  }

  wordAddedByCurrentUser(word: GeneralWord, userId: string): boolean {
    return word.user === userId
  }

  isAdmin() {
    return this.userId === environment.adminId
  }


  hideAddWordButton(menuItems: MenuItem<WordAction>[]): MenuItem<WordAction>[] {
    if (!menuItems) return
    return menuItems.filter(item => item.action !== WordAction.ADD_TO_MY_WORDS)
  }

  hideDeleteWordButton(menuItems: MenuItem<WordAction>[]): MenuItem<WordAction>[] {
    if (!menuItems) return
    return menuItems.filter(item => item.action !== WordAction.DELETE_FROM_SHARE_LIST)
  }

}
