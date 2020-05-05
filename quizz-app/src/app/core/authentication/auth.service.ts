import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/shared/constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'AuthenticatedUser';
export const IS_ADMIN = 'is_admin';
const helper = new JwtHelperService();

/**
 * Interface contenant les informations sur l'utilisateur connecté
 */
export interface UserStatus {
  isLoggedIn: boolean;
  user_id?: string,
  email?: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Service permettant la gestion de l'authentification
   */
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private currentUserSubject = new BehaviorSubject<UserStatus>(this.initUserStatus());
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  /* Permet de se s'authentifier */
  login(email: string, password: string) {
    return this.http.post<any>(`${API_URL}/users/login`, {
      email,
      password
    })
      .pipe(
        map(
          data => {
            localStorage.setItem(TOKEN, `Bearer ${data[TOKEN]}`);
            localStorage.setItem(AUTHENTICATED_USER, email);
            this.isLoginSubject.next(true);
            this.currentUserSubject.next({
              isLoggedIn: true,
              isAdmin: data.user.is_admin,
              email: data.user.email,
              user_id: data.user._id
            });
            return data;
          }
        )
      );
  }

  /* Renvoi les informations sur l'utilisateur connecté */
  public get currentUserValue(): UserStatus {
    return this.currentUserSubject.value;
  }

  /* Permet de se déconnecter */
  logout() {
    this.router.navigate(['/login']);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(AUTHENTICATED_USER);
    this.isLoginSubject.next(false);
    this.currentUserSubject.next({ isLoggedIn: false });
  }

  /* Vérifie si il y'a un utilisateur connecté à l'application */
  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  /* Requete HTTP pour créer un nouvel utilisateur */
  signUp(user: any) {
    return this.http.post<any>(`${API_URL}/api/signup/`, user);
  }

  /* Permet de vérifier qu'un JWT est présent */
  hasToken() {
    return !!localStorage.getItem('token');
  }

  /* Permet d'initialiser les informations de l'utilisateur connecté */
  initUserStatus(): UserStatus {
    if (this.hasToken()) {
      const decodedToken = helper.decodeToken(localStorage.getItem(TOKEN));
      return {
        isLoggedIn: true,
        user_id: decodedToken._id,
        isAdmin: decodedToken.is_admin,
        email: decodedToken.email,
      };
    } else {
      return { isLoggedIn: false }
    }
  }

  /* Renvoi l'email de l'utilisateur authentitfié */
  getAuthenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  /* Renvoi le JWT de l'utilisateur authentifié */
  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return localStorage.getItem(TOKEN);
    }
  }
}
