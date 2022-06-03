import { CopyToClipboardService } from './../../services/copy-to-clipboard.service';
import { PersistanceService } from './../../services/persistance.service';
import { SupportedLanguage, TranslationConfig, TranslationService } from './../../../core/services/translation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeUntil, shareReplay, startWith, finalize } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AbstractControl, UntypedFormBuilder, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit, OnDestroy {
  translationForm = this.fb.group({
    textLang: [''],
    translationLang: [''],
    text: [''],
    translation: ['']
  })
  unsubscribe$ = new Subject()
  private readonly _loading$ = new Subject<boolean>();
  public readonly loading$ = this._loading$.pipe(startWith(false), shareReplay())
  constructor(
    private fb: UntypedFormBuilder,
    private translationService: TranslationService,
    private persistanceService: PersistanceService,
    private route: ActivatedRoute,
    private copyToClipboardService: CopyToClipboardService
  ) { }

  ngOnInit() {
    this.getLastSelectedLanguages();
    this.translateTextFromUrl();
  }
  get text(): AbstractControl {
    return this.translationForm.get('text')
  }

  get translation(): AbstractControl {
    return this.translationForm.get('translation')
  }

  get textLang(): AbstractControl {
    return this.translationForm.get('textLang')
  }

  get translationLang(): AbstractControl {
    return this.translationForm.get('translationLang')
  }

  get supportedLanguagesForTranslation$(): Observable<SupportedLanguage[]> {
    return this.translationService.supportedLanguages$
  }

  translateText(): void {
    if (!this.text.value || !this.translationLang.value) return

    const config: TranslationConfig = {
      text: this.text.value,
      langFrom: this.textLang.value,
      langTo: this.translationLang.value
    }

    this._loading$.next(true);
    this.translationService.getTranslation(config)
      .pipe(
        tap(res => {
          if (res && res.text) {
            this.translation.patchValue(res.text)
            this.saveLastSelectedLanguages(config.langFrom, config.langTo);
          }
        }),
        finalize(() => this._loading$.next(false)),
        takeUntil(this.unsubscribe$)
      ).subscribe()
  }

  public swapLanguages(): void {
    const { textLang, translationLang, text, translation } = this.translationForm.value

    this.translationForm.patchValue({
      textLang: translationLang,
      translationLang: textLang,
      text: translation,
      translation: text
    })
  }

  public copy(source: string): void {

    this.copyToClipboardService.copy(source);

  }

  private saveLastSelectedLanguages(from: string, to: string): void {
    this.persistanceService.set('last-translation-languages', `${from}-${to}`)
  }

  private getLastSelectedLanguages(): void {
    const languagesAsString = this.persistanceService.get('last-translation-languages');

    if (languagesAsString) {
      const [from, to] = languagesAsString?.split('-')

      if (from && to) {

        this.translationForm.patchValue({
          textLang: from,
          translationLang: to
        })
      }
    }

  }

  private translateTextFromUrl(): void {
    const text = this.route.snapshot.queryParamMap.get('text');

    if (text) {
      this.text.patchValue(text);

      this.translateText();
    }

  }



  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
