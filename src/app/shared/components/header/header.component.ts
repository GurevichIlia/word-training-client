import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GeneralFacade } from 'src/app/general.facade';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { LanguageInterface } from 'src/app/modules/languages/types/languages.interfaces';
import { AppStateInterface } from 'src/app/store/reducers';
import { currentLanguageSelector } from 'src/app/store/selectors/languages.selectors';
import { isLoggedInSelector } from '../../../modules/authorization/store/selectors/auth.selectors';
import { CurrentUserInterface } from '../../../shared/interfaces';
import { allWordsQuantitySelector } from './../../../store/selectors/vocabulary.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  user: CurrentUserInterface;
  unsubscribe$ = new Subject();
  currentLanguage$: Observable<LanguageInterface>;
  quantityWords$: Observable<number>;


  location$: Observable<string> = this.generalFacade.getLocation$();
  constructor(
    private generalFacade: GeneralFacade,
    private store$: Store<AppStateInterface>


  ) {

  }
  ngOnInit() {
    this.isLoggedIn$ = this.store$.pipe(select(isLoggedInSelector))
    this.currentLanguage$ = this.store$.pipe(select(currentLanguageSelector));

    this.getquantityWords();
  }

  getquantityWords() {
    this.quantityWords$ = this.store$.pipe(select(allWordsQuantitySelector))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
