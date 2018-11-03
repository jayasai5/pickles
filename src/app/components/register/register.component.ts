import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }
   tryRegister(value) {
    this.authService.doRegister(value)
    .then(res => {
      this.router.navigate(['/verify']);
    }, err => {
      console.log(err);
    });
   }

}
