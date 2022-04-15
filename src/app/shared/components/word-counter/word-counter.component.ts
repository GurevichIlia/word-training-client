import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-word-counter',
  templateUrl: './word-counter.component.html',
  styleUrls: ['./word-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordCounterComponent {
  @Input() totalCardsLearned: number
  @Input() learnedCardsFromGroup: number
  @Input() wordsInGroup: number
  constructor() { }

}
