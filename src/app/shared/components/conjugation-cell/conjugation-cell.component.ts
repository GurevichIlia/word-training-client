import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ConjugationTemplate } from 'src/app/core/models/verbs.model';

@Component({
  selector: 'app-conjugation-cell',
  templateUrl: './conjugation-cell.component.html',
  styleUrls: ['./conjugation-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConjugationCellComponent implements OnInit {

  @Input() conjugation: ConjugationTemplate

  @Input() showText = true;

  constructor() { }

  ngOnInit(): void {
  }

  showTextToggle() {
    this.showText = !this.showText
  }

  get conjugationText(): string {
    return this.showText === true ? this.conjugation?.value : '? ? ? ?'
  }
}
