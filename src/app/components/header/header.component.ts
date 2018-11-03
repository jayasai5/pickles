import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './../../services/user.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;
  email = '';
  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private location: Location,
    private ngZone: NgZone) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => this.ngZone.run(()  => {
      this.assign(user);
    }));
    this.assign(firebase.auth().currentUser);
  }
  assign(user) {
    if (user) {
      this.loggedIn = true;
      this.email = user.email;
    } else {
      this.loggedIn = false;
      this.email = '';
    }
  }
  logout() {
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
      this.loggedIn = false;
    }, (error) => {
      console.log('Logout error', error);
    });
  }
}
