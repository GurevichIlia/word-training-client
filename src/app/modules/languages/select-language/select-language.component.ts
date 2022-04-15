import { AppStateInterface } from 'src/app/store/reducers';
import { ActiveLanguagesTab } from './../types/languages.enums';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddLanguageToUserLanguagesAction, DeleteUserLanguageAction } from 'src/app/store/actions/languages.actions';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectLanguageComponent {
  selectedLanguage = new FormControl('');

  @Input() set candidateToLearn(candidateId: string) {
    this.selectedLanguage.patchValue(candidateId);
  }
  @Input() allLanguages: LanguageInterface[];
  @Input() userLanguages: LanguageInterface[];
  @Input() activeLanguagesTab: ActiveLanguagesTab;
  @Input() set currentlanguageId(currentlanguageId: string) {
    if (currentlanguageId) {
      this.selectedLanguage.patchValue(currentlanguageId);
    } else {
      this.selectedLanguage.reset()
      console.log(this.selectedLanguage.value)
    }
  }

  @Output() selectUserLanguageForLearning = new EventEmitter();
  constructor(
    private store$: Store<AppStateInterface>
  ) {
  }

  addLanguageToUserLanguages(language: LanguageInterface) {
    this.store$.dispatch(AddLanguageToUserLanguagesAction({ languages: [language] }))
  }

  onDeleteUserLanguage(languageId: string) {
    this.store$.dispatch(DeleteUserLanguageAction({ languageId }))
  }

  onSelectUserLanguageForLearning(languageId: string, userLanguages: LanguageInterface[]) {
    this.selectUserLanguageForLearning.emit({ languageId, userLanguages });
  }


}
