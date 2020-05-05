import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: boolean = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /*Authentification */
  onLogin(value: any): void {
    this.authService.login(value.email, value.password).subscribe(
      (data) => {
        data.user.is_admin ? this.router.navigate(['/quizz-manager']) : this.router.navigate(['/quizz-room']);
      },
      /* Authentificationé chouée */
      (error) => {
        this.error = true;
        this.errorMsg = error.error;
      }
    )
  }

  /* Cacher le message d'erreur */
  onCloseError() {
    this.error = false;
  }

}
