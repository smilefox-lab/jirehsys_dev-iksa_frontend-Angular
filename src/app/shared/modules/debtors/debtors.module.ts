import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DebtorsComponent } from './debtors.component';
import { ChartsModule } from '../charts/charts.module';




@NgModule({
  declarations: [
    DebtorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    ChartsModule
  ],
  exports: [
    DebtorsComponent
  ]
})
export class DebtorsModule { }
