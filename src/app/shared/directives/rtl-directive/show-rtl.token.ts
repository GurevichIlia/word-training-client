import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const SHOW_RTL_TOKEN = new InjectionToken<Observable<boolean>>('show rtl token')
