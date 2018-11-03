import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user = this.afAuth.authState
    .pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
   }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.updateUserData(res.user);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doLogin(login) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(login.email, login.password)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        this.updateUserData(res.user);
        resolve(res);
      }, err => reject(err));
    });
  }
  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
  verifyEmail() {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.sendEmailVerification()
      .then(() =>  resolve() , err => reject(err));
    });
  }
  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.collection('users').doc(user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        customer: true,
        admin: false
      }
    };
    return userRef.set(data, { merge: true });
  }
}
