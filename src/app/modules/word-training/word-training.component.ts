import { WordTrainingFacade } from './word-training.facade';
import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-word-training',
  templateUrl: './word-training.component.html',
  styleUrls: ['./word-training.component.scss'],

})
export class WordTrainingComponent implements OnDestroy {

  constructor(
    private wordTrainingFacade: WordTrainingFacade
  ) {

  }

  ngOnDestroy() {
    this.wordTrainingFacade.resetWordTrainingState();
  }
}
