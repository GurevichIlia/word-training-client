import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input() filterValue: FormControl;

  @Output() addWord = new EventEmitter();

  onAddWord({ action }) {
    this.addWord.emit({ action });
  }
}
