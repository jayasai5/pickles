import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public afAuth: AngularFireAuth,
        public userService: UserService,
        private router: Router
    ) {}

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
            .then(user => {
                this.router.navigate(['/home']);
                return resolve(false);
            }, err => {
                return resolve(true);
            });
        });
    }
}
