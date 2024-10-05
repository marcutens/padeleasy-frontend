import { Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddCourtComponent } from './add-court/add-court.component';
import { DeleteCourtComponent } from './delete-court/delete-court.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { RoleResolverService } from './core/services/role-resolver.service';
import { ReserveCourtComponent } from './_components/reserve-court/reserve-court.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], resolve: {dynamicroles: RoleResolverService}, data: { roles: [{ name: 'ROLE_ADMIN'}, {name: 'ROLE_USER'}, {name: 'ROLE_COURT_ADMIN'}] } },
    { path: 'user/:username', component: UserProfileComponent },
    { path: 'add-court', component: AddCourtComponent},
    { path: 'delete-court', component: DeleteCourtComponent},
    { path: 'reserve-court', component: ReserveCourtComponent}
];
