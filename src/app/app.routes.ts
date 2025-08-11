import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SiteInfoPageComponent } from './site-info-page/site-info-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },         
  { path: 'form', component: UserFormComponent },
   { path: 'site-info', component: SiteInfoPageComponent }
];
