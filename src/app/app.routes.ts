import { Routes } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard/dashboard.component';
import { UserProfileComponent } from './_components/user-profile/user-profile.component';
import { AddCourtComponent } from './_components/add-court/add-court.component';
import { DeleteCourtComponent } from './_components/delete-court/delete-court.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { RoleResolverService } from './_services/role-resolver.service';
import { ReserveCourtComponent } from './_components/reserve-court/reserve-court.component';
import { AboutComponent } from './_components/about/about.component';
import { ContactComponent } from './_components/contact/contact.component';
import { CourtComponent } from './_components/court/court.component';
import { CreatematchComponent } from './_components/creatematch/creatematch.component';
import { UserReserveslistComponent } from './_components/user-reserveslist/user-reserveslist.component';
import { UserMatcheslistComponent } from './_components/user-matcheslist/user-matcheslist.component';
import { JoinmatchComponent } from './_components/joinmatch/joinmatch.component';
import { GlobalSearchResultComponent } from './_components/global-search-result/global-search-result.component';
import { SetcourtComponent } from './_components/setcourt/setcourt.component';
import { DeleteSetCourtComponent } from './_components/delete-setcourt/delete-setcourt.component';

export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], resolve: {dynamicroles: RoleResolverService}, data: { roles: [{ name: 'ROLE_ADMIN'}, {name: 'ROLE_USER'}, {name: 'ROLE_COURT_ADMIN'}] } },
    { path: 'user/:username', component: UserProfileComponent },
    { path: 'add-court', component: AddCourtComponent},
    { path: 'add-court/:id', component: AddCourtComponent},
    { path: 'delete-court', component: DeleteCourtComponent},
    { path: 'delete-setcourt', component: DeleteSetCourtComponent},
    { path: 'reserve-court', component: ReserveCourtComponent},
    { path: 'list-courts', component: CourtComponent},
    { path: 'about', component: AboutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'create-match', component: CreatematchComponent},
    { path: 'reserve-list', component: UserReserveslistComponent},
    { path: 'match-list', component: UserMatcheslistComponent},
    { path: 'join-match', component: JoinmatchComponent},
    { path: 'search-results', component: GlobalSearchResultComponent},
    { path: 'list-setcourts', component: SetcourtComponent}
];
