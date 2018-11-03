import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = 'http://localhost:8080/';
  constructor() { }
  getApiUrl(): string {
    return this.url;
  }
}
