import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserSettingsService } from '../user-settings.service';
import { MatSnackBar } from '@angular/material';
import { UserSettings } from '../models/user-settings';

const AVAILABLE_PAGE_SIZES = [
  20,
  50,
  100
];

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  public userSettingsForm: FormGroup;
  public availablePageSizes = AVAILABLE_PAGE_SIZES;

  constructor(private formBuilder: FormBuilder,
              private userSettingsService: UserSettingsService,
              private snackBar: MatSnackBar) {

    this.userSettingsForm = this.formBuilder
      .group({
        // init values
        pageSize: this.userSettingsService.pageSize$.value
      });
  }

  ngOnInit() {
  }

  onSubmit(settings: UserSettings) {
    this.userSettingsService.saveUserSettings(settings);
    this.snackBar.open('💾 Settings saved!', undefined, {duration: 2000});
  }

}
