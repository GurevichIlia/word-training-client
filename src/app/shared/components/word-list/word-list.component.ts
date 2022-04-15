import { WordAction } from '../../../core/enums/word.enum';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action, MenuItem } from 'src/app/core';
import { Word } from 'src/app/shared/interfaces';
import { UtilsService } from '../../services/utils.service';
import { GeneralWord } from 'src/app/modules/general-words/types/general-words.interfaces';


@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordListComponent {
  skeletonArrIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  _showItems: number = 15
  selector = '.scroll-container'
  @Input() words: Word[] | GeneralWord[];
  @Input() filterValue: Observable<string>;
  trackWords: (index: number, word: Word) => string
  // @Input() pageSize: number = 20;
  @Input() selectedGroup: string;
  @Input() isShowDefaultOptions = true;
  @Input() isShowMenu = true;
  @Input() menuItems: MenuItem<WordAction>[];
  @Input() userId: string;
  @Input() isLoading: boolean
  @Input() set showMoreItems(e: Event) {
    this.showMoreWords();

  };

  isShowGoToTopButton$: Observable<boolean> = fromEvent(window, 'scroll').pipe(map(event => window.scrollY >= 1400));

  get showItems() {
    return this._showItems
  }
  @Output() action = new EventEmitter();
  constructor(private utilsService: UtilsService) {
    this.trackWords = this.utilsService.trackBy
  }
  onScroll() {
    console.log('SCROLL')
    this.showMoreWords();

  }

  sendAction(event: Action) {

    this.action.emit(event);
  }

  showMoreWords() {
    this._showItems += 15;
  }

  goToTop() {
    window.scrollTo({ top: 50 });
    this._showItems = 15;
  }


}
