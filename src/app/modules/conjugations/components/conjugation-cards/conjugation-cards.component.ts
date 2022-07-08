import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { VerbWithConjugations } from '../../models/conjugations.interface';
import { ConjugationCellComponent } from 'src/app/shared/components/conjugation-cell/conjugation-cell.component';

@Component({
  selector: 'app-conjugation-cards',
  templateUrl: './conjugation-cards.component.html',
  styleUrls: ['./conjugation-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConjugationCardsComponent implements OnInit {
  @Input()
  verbWithConjugations: VerbWithConjugations

  times: VerbTime[] = ['future', 'present', 'past']
  constructor() { }

  ngOnInit(): void {
  }

}
