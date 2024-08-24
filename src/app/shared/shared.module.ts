import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';

import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    MainNavigationComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    AppRoutingModule,
  ],
  exports: [
    MainNavigationComponent
  ]
})
export class SharedModule { }
