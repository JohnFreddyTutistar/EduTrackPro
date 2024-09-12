import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider'
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

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HelpComponent } from './pages/help/help.component';
import { ApplicantTableComponent } from './pages/applicant-table/applicant-table.component';
import { ReviewTeamTableComponent } from './pages/review-team-table/review-team-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ApplicantTableComponent,
    ReviewTeamTableComponent,
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
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    ToolbarModule,
    MatSidenavModule,
    SharedModule,
    MatListModule,
    MatCardModule,
    AuthModule,
    SearchModule,
    ActivitiesModule,
    HttpClientModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  exports: [
    // TimelineHComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
