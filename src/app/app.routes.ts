import { Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user/:username', component: UserProfileComponent }
];
