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

  constructor() { }

  ngOnInit(): void {
  }

}
