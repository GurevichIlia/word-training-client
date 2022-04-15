import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { VerbWithConjugations } from 'src/app/modules/conjugations/models/conjugations.interface';
import { Word } from 'src/app/shared/interfaces';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ConjugationCardComponent } from './../conjugation-card/conjugation-card.component';

@Component({
  selector: 'app-conjugations-list',
  templateUrl: './conjugations-list.component.html',
  styleUrls: ['./conjugations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConjugationsListComponent {
  @Input()
  conjugationCardRef: TemplateRef<ConjugationCardComponent>
  @Input()
  verbs: VerbWithConjugations[]

  private _showItems: number = 15
  trackWords: (index: number, word: Word) => string

  constructor(private utilsService: UtilsService) {
    this.trackWords = this.utilsService.trackBy
  }
  get showItems() {
    return this._showItems
  }

  public onScroll() {
    console.log('SCROLL')
    this.showMoreWords();
  }

  private showMoreWords() {
    this._showItems += 15;
  }




}
