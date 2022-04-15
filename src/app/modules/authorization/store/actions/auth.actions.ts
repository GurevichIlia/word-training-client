import { createAction, props } from '@ngrx/store';
import { AfterLoginDataInterface, LoginRequestInterface, RegisterRequestInterface } from 'src/app/core/models/auth.model';
import { CurrentUserInterface } from 'src/app/shared/interfaces';

export enum AuthActionsType {
  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register success',
  REGISTER_ERROR = '[AUTH] Register error',

  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login success',
  LOGIN_ERROR = '[AUTH] Login error',

  GET_CURRENT_USER = '[Current user] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Current user] Get current user success',
  GET_CURRENT_USER_ERROR = '[Current user] Get current user error',

  LOGOUT = '[AUTH] Logout'
  // Create = '[AUTH] create Word',
  // Delete = '[AUTH] delete Word',
  // Favorite = '[AUTH] toggle add word to favorite',
  // Edit = '[AUTH] edit Word',
  // Save = '[AUTH] save Word',
  // Success = '[AUTH] Word loading success',
  // Error = '[AUTH] Word loading error'
}

// export class RegisterAction implements Action {
//   readonly type: AuthActionsType.REGISTER;
//   constructor(public requestData: RegisterRequestInterface) { }
// }

// export class RegisterSuccessAction implements Action {
//   readonly type: AuthActionsType.REGISTER_SUCCESS;
//   constructor(public currentUser: User) { }
// }

// export class RegisterErrorAction implements Action {
//   readonly type: AuthActionsType.REGISTER_ERROR;
//   constructor(public backendErrors: BackendErrorInterface) { }
// }


export const registerAction = createAction(AuthActionsType.REGISTER, props<{ requestData: RegisterRequestInterface }>());
export const registerSuccessAction = createAction(AuthActionsType.REGISTER_SUCCESS, props<{ currentUser: CurrentUserInterface }>());
export const registerErrorAction = createAction(AuthActionsType.REGISTER_ERROR, props<{ backendErrors: string }>())

export const loginAction = createAction(AuthActionsType.LOGIN, props<{ requestData: LoginRequestInterface }>());
export const loginSuccessAction = createAction(AuthActionsType.LOGIN_SUCCESS, props<{ successData: AfterLoginDataInterface }>());
export const loginErrorAction = createAction(AuthActionsType.LOGIN_ERROR, props<{ backendErrors: string }>())

export const getCurrentUserAction = createAction(AuthActionsType.GET_CURRENT_USER);
export const getCurrentUserSuccessAction = createAction(AuthActionsType.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>());
export const getCurrentUserErrorAction = createAction(AuthActionsType.GET_CURRENT_USER_ERROR)

export const logoutAction = createAction(AuthActionsType.LOGOUT);
