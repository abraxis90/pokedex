import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { UserSettings } from '../models/user-settings';

const USER_SETTINGS_KEY = 'user-settings';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  public pageSize$: BehaviorSubject<number>;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    // init
    const userSettings = this.getUserSettings();
    const pageSize = userSettings ? this.getUserSettings().pageSize : 20;
    this.pageSize$ = new BehaviorSubject<number>(pageSize);
  }

  public saveUserSettings(settings: UserSettings) {
    this.persistUserSettings(settings);
    this.pageSize$.next(settings.pageSize);
  }

  private getUserSettings(): UserSettings | undefined {
    return this.storage.get(USER_SETTINGS_KEY);
  }

  private persistUserSettings(settings: UserSettings): void {
    this.storage.set(USER_SETTINGS_KEY, settings);
  }

}
