import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutes } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReviewTeamTableComponent } from '../pages/review-team-table/review-team-table.component';
import { MyAccountComponent } from './my-account/my-account.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    MyAccountComponent,
    // ReviewTeamTableComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    AuthRoutes,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    MyAccountComponent
  ]
})
export class AuthModule { }
