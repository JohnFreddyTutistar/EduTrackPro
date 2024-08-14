import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutes } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    AuthRoutes,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent
  ]
})
export class AuthModule { }
