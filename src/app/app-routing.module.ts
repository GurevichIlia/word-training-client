import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'vocabulary', },

  {
    path: '', loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule),
    canActivate: [AuthGuard],

  },
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],

  },

  { path: '**', redirectTo: 'vocabulary' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
