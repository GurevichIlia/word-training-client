import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Word, WordGroup } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusMessageComponent implements OnInit {
  @Input() words: Word[]
  @Input() selectedGroup: WordGroup
  @Input() searchValue: string
  @Input() isLoading: boolean

  @Output() openCsvUploader = new EventEmitter<void>()
  constructor() { }

  ngOnInit() {
  }

}
