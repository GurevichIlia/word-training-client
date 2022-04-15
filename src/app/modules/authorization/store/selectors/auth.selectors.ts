import { AuthStateInterface } from '../../../../core/models/auth.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../../../store/reducers';
import { AUTH_REDUCER_NODE } from '../reducers/auth.reducers';


export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>(AUTH_REDUCER_NODE);

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  state => state.isSubmitting
);

export const backendErrorsSelector = createSelector(
  authFeatureSelector,
  state => state.backendErrors
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  state => state.currentUser
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  state => state.isLoggedIn
);

export const isRegistrationSuccessSelector = createSelector(
  authFeatureSelector,
  state => state.isRegistrationSuccess ? { isSuccess: true, user: state.currentUser } : { isSuccess: false, error: state.backendErrors }
);

// export const currentLanguageSelector = createSelector(
//   authFeatureSelector,
//   state => !state.currentUser ? null : state.currentUser.currentLanguage || false
// );

// export const isSubmittingSelector = createSelector(
//   authFeatureSelector,
//   state => state?.isSubmitting
// );
