import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getLocale(): string {
    return 'pt-Br'
  }
}
