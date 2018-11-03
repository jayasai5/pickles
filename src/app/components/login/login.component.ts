import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  @ViewChild(ClrForm) clrForm;
  loginForm: FormGroup;
  errorMessage = '';
  submit = false;
  invalid = false;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
   }

  ngOnInit() {
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  tryLogin(value) {
    if (this.loginForm.invalid) {
      this.clrForm.markAsDirty();
      this.invalid = false;
      return;
    }
    this.submit = true;
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.submit = false;
      this.invalid = true;
      this.loginForm.reset();
    });
  }
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/home']);
    });
  }
}
