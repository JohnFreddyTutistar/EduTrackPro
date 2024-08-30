import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableActivitiesComponent } from './table-activities/table-activities.component';



@NgModule({
  declarations: [
    TableActivitiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableActivitiesComponent
  ]
})
export class ActivitiesModule { }
