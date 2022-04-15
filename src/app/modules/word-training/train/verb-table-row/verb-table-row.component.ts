import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConjugationTemplate } from 'src/app/core/models/verbs.model';

@Component({
  selector: 'app-verb-table-row',
  templateUrl: './verb-table-row.component.html',
  styleUrls: ['./verb-table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerbTableRowComponent implements OnInit {
  @Input() conjugation: ConjugationTemplate
  @Input() showText = false
  @Input() isShowEyeIcon = true;
  constructor() { }

  ngOnInit() {

  }

  showToggle() {
    this.showText = !this.showText
  }
}
