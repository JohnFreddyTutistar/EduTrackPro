import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu'
import { MatDividerModule } from '@angular/material/divider';

import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [],
})
export class ToolbarModule {}
