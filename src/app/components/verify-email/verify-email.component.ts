import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  sent = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.verifyEmail()
    .then(() => {
      this.sent = true;
    }, err => {
      this.sent = false;
      this.errorMessage = err;
    });
  }

}
