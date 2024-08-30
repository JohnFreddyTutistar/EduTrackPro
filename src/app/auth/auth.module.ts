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
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
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
    MatSelectModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
