import { getLearningLanguageAction } from 'src/app/store/actions/languages.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/store/reducers';
import { globalLoaderSelector } from 'src/app/store/selectors/general.selector';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  globalLoader$: Observable<boolean>

  // currentLearningLanguage
  constructor(

    private store$: Store<AppStateInterface>

  ) {
  }

  ngOnInit() {
    this.globalLoader$ = this.store$.pipe(select(globalLoaderSelector))
    this.store$.dispatch(getLearningLanguageAction())

  }
}
