import { Injectable } from "@angular/core";
@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to local storage')
    }
  }

  get(key: string): string | null {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }

  clearToken() {
    try {
      localStorage.removeItem('words-token')
    } catch (e) {
      console.error('Error deleting token from localStorage', e)
      return null
    }

  }
}
