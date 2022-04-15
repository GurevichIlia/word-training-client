import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { NavigationService } from './../../../core/services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AppStateInterface } from 'src/app/store/reducers';
import { AppRoutes } from 'src/app/core/routes/routes';
import { logoutAction } from '../../authorization/store/actions/auth.actions';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  learningLanguage$: Observable<LanguageInterface>;
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private store$: Store<AppStateInterface>
  ) { }

  ngOnInit() {
    // this.getLearningLanguage();
    this.learningLanguage$ = this.store$.pipe(select(currentLanguageSelector))
  }

  onChangeLearningLanguage() {
    this.navigationService.navigateTo(AppRoutes.Languages)
  }

  onLogOut() {
    this.store$.dispatch(logoutAction())
  }

  // getLearningLanguage() {
  //   this.learningLanguage$ = this.generalFacade.getCurrentLearningLanguage$();
  // }
}
