import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Word } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-word-card-body',
  templateUrl: './word-card-body.component.html',
  styleUrls: ['./word-card-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordCardBodyComponent {
  @Input() text: string;
  @Input() isFavorite: boolean
  @Output() favoriteToggle = new EventEmitter();

  favorite() {
    this.favoriteToggle.emit();
  }
}
