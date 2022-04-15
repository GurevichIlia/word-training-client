import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { defaultGroups } from 'src/app/core/models/groups.model';
import { GeneralFacade } from 'src/app/general.facade';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import {
  FetchAllLanguagesAction,
  FetchUserLanguagesAction,
  setCurrentLearningLanguageAction
} from 'src/app/store/actions/languages.actions';
import { selectVocabularyGroupAction } from 'src/app/store/actions/vocabulary.actions';
import { AppStateInterface } from 'src/app/store/reducers';
import { currentLanguageSelector, userlanguagesSelector, allLanguagesSelector, activeTabSelector, isLoadingSelector } from 'src/app/store/selectors/languages.selectors';

import { LanguagesService } from './languages.service';
import { ActiveLanguagesTab } from './types/languages.enums';
import { LanguageInterface } from './types/languages.interfaces';


@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  allLanguages$: Observable<LanguageInterface[]>;
  userLanguages$: Observable<LanguageInterface[]>;
  activeTab$: Observable<ActiveLanguagesTab>;
  currentLearningLanguage$: Observable<LanguageInterface>;
  subscription$ = new Subject();
  isLoading$: Observable<boolean>

  languageIdCandidateToLearn: string;

  constructor(
    private notifications: NotificationsService,
    private languagesService: LanguagesService,
    private router: Router,
    private generalFacade: GeneralFacade,
    private store$: Store<AppStateInterface>
  ) {
  }

  ngOnInit() {
    this.fetchData()
    this.initializeValues()

  }

  initializeValues() {
    this.currentLearningLanguage$ = this.store$.pipe(select(currentLanguageSelector))
    this.userLanguages$ = this.store$.pipe(select(userlanguagesSelector))
    this.allLanguages$ = this.store$
      .pipe(
        select(allLanguagesSelector),
        filter(languages => languages !== null),
        // switchMap(languages => this.languagesService.markLanguageAsAddedToUserLanguages(languages, this.userLanguages$))
      )
    // switchMap(allLanguages => this.languagesService.markAsAddedToUserLanguages(allLanguages, this.userLanguages$)))
    this.activeTab$ = this.store$.pipe(select(activeTabSelector))
    this.isLoading$ = this.store$.pipe(select(isLoadingSelector))
  }

  fetchData() {
    this.store$.dispatch(FetchAllLanguagesAction())
    this.store$.dispatch(FetchUserLanguagesAction())

  }

  goToVocabulary() {
    this.router.navigate(['vocabulary']);
  }

  setCurrentLearningLanguage({ languageId, userLanguages }) {
    if (userLanguages.length === 0) {
      return this.notifications.warning('', 'Please add language');
    }

    if (languageId) {
      this.languageIdCandidateToLearn = null;
      this.setCurrentLanguageOnServer(languageId)
    } else {
      this.notifications.warning('', 'Please select language');
    }
  }

  setCurrentLanguageOnServer(languageId) {

    this.store$.dispatch(setCurrentLearningLanguageAction({ languageId }))
    const ALL_WORDS = 0
    this.store$.dispatch(selectVocabularyGroupAction({ group: defaultGroups[ALL_WORDS] }))
  }

  unsubscribe() {
    this.subscription$.next();
    this.subscription$.complete();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }
}
