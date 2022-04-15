// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, switchMap, tap } from 'rxjs/operators';
// import { Routes } from 'src/app/core/routes/routes.ts';
// import { AuthService } from 'src/app/modules/authorization/services/auth.service';
// import { AfterLoginDataInterface, LoginRequestInterface, RegisterRequestInterface } from './../../core/models/auth.model';
// import { NavigationService } from './../../core/services/navigation.service';
// import { CurrentUserInterface } from './../../shared/interfaces';
// import { PersistanceService } from './../../shared/services/persistance.service';
// import {
//   AuthActionsType, getCurrentUserErrorAction, getCurrentUserSuccessAction,
//   loginSuccessAction, registerErrorAction, registerSuccessAction
// } from './../actions/auth.actions';

// @Injectable()
// export class AuthEffects {

//   constructor(
//     private actions$: Actions,
//     private authService: AuthService,
//     private navigation: NavigationService,
//     private persistanceService: PersistanceService
//   ) { }

//   register$ = createEffect(() => this.actions$.pipe(
//     ofType(AuthActionsType.REGISTER),
//     switchMap(({ requestData }: { requestData: RegisterRequestInterface }) => {
//       return this.authService.registration(requestData)
//         .pipe(
//           map((user: CurrentUserInterface) => registerSuccessAction({ currentUser: user })),
//           catchError((err: { message: string }) => {
//             return of(registerErrorAction({ backendErrors: err.message }))
//           })
//         )
//     }
//     ))
//   )

//   successRegister$ = createEffect(() => this.actions$.pipe(
//     ofType(AuthActionsType.REGISTER_SUCCESS),
//     tap(_ => this.navigation.navigateTo(Routes.Login))
//   ),
//     { dispatch: false }
//   )

//   login$ = createEffect(() => this.actions$.pipe(
//     ofType(AuthActionsType.LOGIN),
//     switchMap(({ requestData }: { requestData: LoginRequestInterface }) => {
//       return this.authService.login(requestData)
//         .pipe(
//           map((successData: AfterLoginDataInterface) => {
//             this.persistanceService.set('words-token', successData.token)
//             return loginSuccessAction({ successData })
//           }),
//           catchError((err: { message: string }) => {
//             return of(registerErrorAction({ backendErrors: err.message }))
//           })
//         )
//     }
//     ))
//   )

//   successLogin$ = createEffect(() => this.actions$.pipe(
//     ofType(AuthActionsType.LOGIN_SUCCESS),
//     tap((resData: AfterLoginDataInterface) => {
//       if (resData.currentLanguage) {
//         // this.generalFacade.setCurrentLanguage(of(resData.currentLanguage));
//         this.navigation.navigateTo(Routes.Vocabulary)
//       } else {
//         this.navigation.navigateTo(Routes.Languages)
//       }
//     })
//   ),
//     { dispatch: false }
//   )

//   getCurrentUser$ = createEffect(() => this.actions$.pipe(
//     tap(act => console.log('ACTION', act)),
//     ofType(AuthActionsType.GET_CURRENT_USER),
//     switchMap(_ => {
//       const token = this.persistanceService.get('words-token')
//       if (!token) {
//         return of(getCurrentUserErrorAction())
//       }
//       return this.authService.getCurrentUser()
//         .pipe(
//           map((user: CurrentUserInterface) => getCurrentUserSuccessAction({ currentUser: user })),
//           catchError(_ => {
//             return of(getCurrentUserErrorAction())
//           })
//         )
//     }
//     ))
//   )
// }
