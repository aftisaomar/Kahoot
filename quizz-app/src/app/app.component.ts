import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserStatus } from './core/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quizz-app-frontend';
  userSubscription: Subscription;
  userStatus: UserStatus;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.currentUser.subscribe(status => {
      this.userStatus = status
    });

  }

  ngOnInit() {

  }

  onLogout() {
    this.authService.logout();
  }

  /* Se désinscrire de l'observable */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe;
  }

}
