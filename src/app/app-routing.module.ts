import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './pages/help/help.component';
import { ApplicantTableComponent } from './pages/applicants/applicant-table/applicant-table.component';
import { ReviewTeamTableComponent } from './pages/review-team-table/review-team-table.component';
import { DialogApplicantComponent } from './pages/applicants/dialog-applicant/dialog-applicant.component';
import { DialogCallHistoryComponent } from './pages/applicants/dialog-call-history/dialog-call-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/review-team-table/calendar/calendar.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'search',
    component: SearchComponent,
    // loadChildren: () => import('./search/search.module').then( (m) => m.SearchModule)
  },
  {
    path: 'applicants',
    component: ApplicantTableComponent,
  },
  {
    path: 'reviewerTeam',
    component: ReviewTeamTableComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'calendar/:id',
    component: CalendarComponent,
  },
  {
    path: 'inscriptions',
    component: InscriptionsComponent,
  },
  {
    path: 'profileApplicant/:id',
    component: DialogApplicantComponent,
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
