import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TranslationResponseInterface {
  code: 200
  detected: { lang: string }
  lang: string
  text: string[]
}

export interface TranslationConfig {
  text: string,
  langFrom: string,
  langTo: string
}

export interface SupportedLanguage {
  language: string,
  shortcut: string
}

const supportedLanguages =
  `English - en
German - de
Hebrew - he
Russian - ru
Spanish - es
French - fr`


//     `
// Azerbaijani - az
// Malayalam - ml
// Albanian - sq
// Maltese - mt
// Amharic - am
// Macedonian - mk
// English - en
// Maori - mi
// Arabic - ar
// Marathi - mr
// Armenian - hy
// Mari - mhr
// Afrikaans - af
// Mongolian - mn
// Basque - eu
// German - de
// Bashkir - ba
// Nepali - ne
// Belarusian - be
// Norwegian - no
// Bengali - bn
// Punjabi - pa
// Burmese - my
// Papiamento - pap
// Bulgarian - bg
// Persian - fa
// Bosnian - bs
// Polish - pl
// Welsh - cy
// Portuguese - pt
// Hungarian - hu
// Romanian - ro
// Vietnamese - vi
// Russian - ru
// Haitian(Creole) - ht
// Cebu - ceb
// Galician - gl
// Serbian - sr
// Dutch - nl
// Sinhala - si
// gornomariyskiy - mrj
// Slovak - sk
// Greek - el
// Slovenian - sl
// Georgian - ka
// Swahili - sw
// Gujarati - gu
// Sundanese - su
// Danish - da
// Tajik - tg
// Hebrew - he
// Thai - th
// Yiddish - yi
// Tagalog - tl
// Indonesian - id
// Tamil - ta
// Irish - ga
// Tatarsky - tt
// Italian - it
// Telugu - te
// Icelandic - is
// Turkish - tr
// Spanish - es
// Udmurt - udm
// Kazakh - kk
// Uzbek - uz
// Kannada - kn
// Ukrainian - uk
// Catalan - ca
// Urdu - ur
// Kyrgyz - ky
// Finnish - fi
// Chinese - zh
// French - fr
// Korean - ko
// Hindi - hi
// braid - xh
// Croatian - hr
// Khmer - km
// Czech - cs
// Lao - lo
// Swedish - sv
// Latin - la
// Scottish - gd
// Latvian - lv
// Estonian - et
// Lithuanian - lt
// Esperanto - eo
// Luxembourg - lb
// Javanese - jv
// Malagasy - mg
// Japanese - ja
// Malay - ms`


@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _languages: SupportedLanguage[] = []
  constructor(
    private api: ApiService
  ) {
    this.getSupportedLanguagesForTranslation()
  }

  get supportedLanguages$(): Observable<SupportedLanguage[]> {
    return of(this._languages)
  }

  getTranslation(config: TranslationConfig): Observable<TranslationResponseInterface> {
    const { text, langFrom, langTo } = config
    const headers = new HttpHeaders()
      .append('content-type', 'application/json')
      .append('x-rapidapi-key', '3b8f378fcdmsha571ef330031ae5p14b2c7jsn0508d3a87f28')
      .append('x-rapidapi-host', 'just-translated.p.rapidapi.com')
    const url = `https://just-translated.p.rapidapi.com/?lang=${langTo}&text=${text}`
    return this.api.get(url, { headers })
  }

  private getSupportedLanguagesForTranslation(): void {
    this._languages = supportedLanguages.split('\n').sort().map((lang: string) => {
      const langAsArr = lang.split('-')
      const language = langAsArr[0].trim()
      const shortcut = langAsArr[1].trim()
      const suppordLang: SupportedLanguage = { language, shortcut }

      return suppordLang
    })
  }
}

