import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import * as firebase from 'firebase/app';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private config: ConfigService) {
   }
  // register(email: string, password: string, phone: string, name: string): Observable<boolean> {
  //   const body = JSON.stringify({email, password, phone, name});
  //   return this.http.post(this.baseUrl + 'register', body, httpOptions).catch();
  // }
  getCurrentUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
