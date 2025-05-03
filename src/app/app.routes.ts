import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },          // עמוד הבית האמיתי
  { path: 'form', component: UserFormComponent }
];
