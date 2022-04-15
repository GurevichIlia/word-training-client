import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  getItem(name: string) {
    return localStorage.getItem(name);
  }

  removeItem(name: string) {
    localStorage.removeItem(name);
  }
}
