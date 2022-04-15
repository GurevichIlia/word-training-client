import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { Languages } from 'src/app/core/enums/languages.enum';
import { Word } from 'src/app/shared/interfaces';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';

@Component({
  selector: 'app-word-card-body',
  templateUrl: './word-card-body.component.html',
  styleUrls: ['./word-card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordCardBodyComponent {
  @Input() text: string;
  @Input() isFavorite: boolean
  @Input() type: 'word' | 'translation'
  @Output() favoriteToggle = new EventEmitter();

  public readonly showRtl$: Observable<boolean> = this.store.select(currentLanguageSelector).pipe(
    filter(language => language?.name === Languages.Hebrew && this.type === 'word'),
    mapTo(true)
  )

  constructor(private store: Store) { }
  favorite() {
    this.favoriteToggle.emit();
  }
}
