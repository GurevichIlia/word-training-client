import { LanguageInterface } from './../../modules/languages/types/languages.interfaces';
import { CurrentUserInterface } from './../../shared/interfaces';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null;
  backendErrors: string | null;
  isLoggedIn: boolean | null;
  isLoading: boolean;
  isRegistrationSuccess: boolean | null

}

export interface RegisterRequestInterface {
  email: string;
  password: string;
  nickName: string;
}

export interface LoginRequestInterface {
  email: string;
  password: string;
}

export interface AfterLoginDataInterface {
  token: string,
  message: string,
  currentLanguage: LanguageInterface;
  currentUser: CurrentUserInterface
}
