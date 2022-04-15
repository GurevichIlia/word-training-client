import { Action, createReducer, on } from '@ngrx/store';
import { ReducerNode } from 'src/app/core/enums/store.enum';
import { AuthStateInterface } from 'src/app/core/models/auth.model';
import {
  getCurrentUserAction, getCurrentUserErrorAction, getCurrentUserSuccessAction, loginAction, loginErrorAction, loginSuccessAction,
  logoutAction, registerAction, registerErrorAction, registerSuccessAction
} from 'src/app/modules/authorization/store/actions/auth.actions';


export const AUTH_REDUCER_NODE: ReducerNode.AUTH = ReducerNode.AUTH

const authInitialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  backendErrors: null,
  isRegistrationSuccess: null
}

// export const authReducer = (state: AuthStateInterface = authInitialState, action: AuthActions) => {x
//   switch (action.type) {
//     case AuthActionsType.REGISTER:
//       return {
//         ...state,
//         isSubmitting: true
//       }
//     case AuthActionsType.REGISTER_SUCCESS:
//       return {
//         ...state,
//         currentUser: action.currentUser,
//         isSubmitting: false
//       };
//     case AuthActionsType.REGISTER_ERROR:
//       return {
//         ...state,
//         backendErrors: action.backendErrors,
//         isSubmitting: false
//       };
//   }
// }


const reducer = createReducer(
  authInitialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      currentUser: action.currentUser,
      isRegistrationSuccess: true,
      isSubmitting: false,
    })),
  on(
    registerErrorAction,
    (state, action): AuthStateInterface => ({
      ...state,
      backendErrors: action.backendErrors,
      isRegistrationSuccess: false,
      isSubmitting: false
    })),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrors: null,
    })),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoggedIn: true,
      currentUser: action.successData.currentUser,
      isSubmitting: false,
    })),
  on(
    loginErrorAction,
    (state, action): AuthStateInterface => ({
      ...state,
      backendErrors: action.backendErrors,
      isSubmitting: false
    })),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      currentUser: action.currentUser,
      isLoggedIn: true,
      isLoading: false
    })),
  on(
    getCurrentUserErrorAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
      currentUser: null
    })),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
      currentUser: null
    })),
)
export function authReducer(state: AuthStateInterface, action: Action) {
  return reducer(state, action);
}



