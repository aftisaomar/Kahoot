import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private authService: AuthService) { }

  /** Permet d'intercepter les Requetes HTTP envoyés par l'application pour les munir du JWT de 
   *l'utilisateur authentifié */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtHeaderString = this.authService.getAuthenticatedToken();
    const username = this.authService.getAuthenticatedUser();

    if (jwtHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: jwtHeaderString
        }
      });
    }

    return next.handle(req);
  }
}
