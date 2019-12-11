import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoryPageComponent } from './directory-page/directory-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';


const routes: Routes = [
  {
    path: '',
    component: DirectoryPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
