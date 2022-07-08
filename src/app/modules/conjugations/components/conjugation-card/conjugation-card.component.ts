import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Conjugation } from 'src/app/modules/conjugations/models/conjugations.interface';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConjugationCardComponent implements OnInit {
  @Input()
  conjugation: Conjugation


  constructor() { }

  ngOnInit(): void {
  }

}
