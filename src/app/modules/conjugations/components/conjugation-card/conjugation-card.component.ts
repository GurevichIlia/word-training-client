import { VerbTime } from 'src/app/modules/conjugations/models/conjugations.interface';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { VerbWithConjugations } from '../../models/conjugations.interface';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConjugationCardComponent implements OnInit {
  @Input()
  verbWithConjugations: VerbWithConjugations

  times: VerbTime[] = ['future', 'present', 'past']
  constructor() { }

  ngOnInit(): void {
  }

}
