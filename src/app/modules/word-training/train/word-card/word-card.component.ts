import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Word, Verb } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss']
})
export class WordCardComponent {
  isFlipped = false
  @ViewChild('frontCard') frontCard
  @Input() word: Word | Verb;
  // @Output() favoriteToggle = new EventEmitter<Word>();

  // favorite(word: Word) {
  //   this.favoriteToggle.emit(word);
  // }

  flipToggle() {
    this.isFlipped = !this.isFlipped
  }

  get isVerb(): boolean {
    const isVerb = 'conjugations' in this.word
    return isVerb
  }
}
