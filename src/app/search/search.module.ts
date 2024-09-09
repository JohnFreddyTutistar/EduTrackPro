import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NgxGaugeModule } from 'ngx-gauge';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusTableDialogComponent } from './status-table-dialog/status-table-dialog.component';
import { TimelineHComponent } from './indicators/timeline-h/timeline-h.component';

@NgModule({
  declarations: [
    SearchComponent,
    StatusTableDialogComponent,
    TimelineHComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    NgxGaugeModule,
    MatTooltipModule
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
