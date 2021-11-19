import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { LeaseComponent } from './lease.component';
import { ChartsModule } from '../charts/charts.module';


@NgModule({
  declarations: [
    LeaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    ChartsModule
  ],
  exports: [
    LeaseComponent
  ]
})
export class LeaseModule { }
