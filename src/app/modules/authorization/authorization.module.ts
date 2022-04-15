import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { NbCardModule, NbLayoutModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/modules/authorization/services/auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { PersistanceService } from './../../shared/services/persistance.service';
import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CurrentUserEffects } from './store/effects/current-user.effects';
import { LoginEffects } from './store/effects/login.effects';
import { LogoutEffects } from './store/effects/logout.effects';
import { RegisterEffects } from './store/effects/register.effects';
import { authReducer, AUTH_REDUCER_NODE } from './store/reducers/auth.reducers';

const authRoutes: Routes = [
  {
    path: '', component: AuthorizationComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'registration', component: RegistrationComponent,
      },
    ]
  },
];

// const authRoutes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/login' },
//   { path: 'login', component: LoginComponent },
//   { path: 'registration', component: RegistrationComponent },
// ];

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    RouterModule.forChild(authRoutes),
    StoreModule.forFeature(AUTH_REDUCER_NODE, authReducer),
    EffectsModule.forFeature([CurrentUserEffects, LoginEffects, LogoutEffects, RegisterEffects]),
    SharedModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    MatSnackBarModule
  ],
  providers: [
    PersistanceService,
    NotificationsService
  ]
})
export class AuthorizationModule { }
