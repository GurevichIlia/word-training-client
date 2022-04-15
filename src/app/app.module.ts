import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NbDialogModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TuiDialogModule, TuiNotificationsModule, TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import * as Hammer from 'hammerjs';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstallSuggestionComponent } from './core/install-app/install-suggestion/install-suggestion.component';
import { ServerErrorInterceptor } from './core/interceptors/server-error.interceptor';
import { TokenInterceptorService } from './core/interceptors/token.interceptor';
import { LEARNING_LANGUAGE_PROVIDER } from './core/tokens/learning-language.token';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { LoaderModule } from './shared/components/loader/loader.module';
import { PersistanceService } from './shared/services/persistance.service';
import { clearState, getGeneralStateEffects, reducers } from './store/reducers';


@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: Hammer.DIRECTION_ALL }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    InstallSuggestionComponent,

    // UserDataComponent,
    // HomeComponent,
    // WordListComponent,



    // SelectionComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HammerModule,
    AppRoutingModule,

    HttpClientModule,
    AuthorizationModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbDialogModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    StoreModule.forRoot(reducers, { metaReducers: [clearState] }),
    EffectsModule.forRoot(getGeneralStateEffects()),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    LoaderModule,
      TuiRootModule,
      TuiDialogModule,
      TuiNotificationsModule
],
  exports: [
    BrowserAnimationsModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    PersistanceService,
    LEARNING_LANGUAGE_PROVIDER,
      {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
