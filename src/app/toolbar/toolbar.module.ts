import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    MatButtonModule
  ],
  declarations: [
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [],
})
export class ToolbarModule {}
