import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    get<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (data) {
          return JSON.parse(data)
        }
        return null;
      }
    
    set<T>(key: string, item: T) {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(item));
      }
}
