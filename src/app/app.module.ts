import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivitiesModule } from './activities/activities.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBadgeModule } from '@angular/material/badge';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ApplicantTableComponent } from './pages/applicants/applicant-table/applicant-table.component';
import { ReviewTeamTableComponent } from './pages/review-team-table/review-team-table.component';
import { DialogApplicantComponent } from './pages/applicants/dialog-applicant/dialog-applicant.component';
import { DialogCallHistoryComponent } from './pages/applicants/dialog-call-history/dialog-call-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterCallComponent } from './pages/applicants/register-call/register-call.component';
import { CalendarComponent } from './pages/review-team-table/calendar/calendar.component';
import { ContactFormComponent } from './pages/help/contact-form/contact-form.component';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ApplicantTableComponent,
    ReviewTeamTableComponent,
    DialogApplicantComponent,
    DialogCallHistoryComponent,
    DashboardComponent,
    RegisterCallComponent,
    CalendarComponent,
    ContactFormComponent,
    InscriptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    ToolbarModule,
    MatSidenavModule,
    MatDatepickerModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    AuthModule,
    SearchModule,
    MatStepperModule,
    ActivitiesModule,
    HttpClientModule,
    MatTooltipModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [
    // TimelineHComponent
    ReviewTeamTableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
