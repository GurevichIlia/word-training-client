import { LanguageInterface } from './../../../modules/languages/types/languages.interfaces';
import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LEARNING_LANGUAGE } from 'src/app/core/tokens/learning-language.token';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  @Input() label: string = ''
  @Input() checked: boolean
  @Output() check = new EventEmitter<void>()
  isHebrew$: Observable<boolean> = this.learningLanguage$.pipe(map(lang => lang.name === 'Hebrew'), tap(e => console.log('is hebrew', e)))
  constructor(@Inject(LEARNING_LANGUAGE) private readonly learningLanguage$: Observable<LanguageInterface>) { }

  onCheck(): void {
    this.check.emit()
  }


}
