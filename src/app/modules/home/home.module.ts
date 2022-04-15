import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbLayoutModule } from '@nebular/theme';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SelectLanguageGuard } from 'src/app/shared/guards/select-language-guard.guard';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    HomeRoutingModule,

    LoaderModule,
  ],
  providers: [SelectLanguageGuard]

})
export class HomeModule { }
