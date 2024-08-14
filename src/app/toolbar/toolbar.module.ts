import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ToolbarComponent } from './toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    MatButtonModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [],
})
export class ToolbarModule {}
