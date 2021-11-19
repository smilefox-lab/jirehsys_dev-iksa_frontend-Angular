import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineComponent } from './line/line.component';
import { ColumnComponent } from './column/column.component';
import { PieComponent } from './pie/pie.component';
import { SolidGaugeComponent } from './solid-gauge/solid-gauge.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    ColumnComponent,
    LineComponent,
    PieComponent,
    SolidGaugeComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    ColumnComponent,
    LineComponent,
    PieComponent,
    SolidGaugeComponent
  ]
})
export class ChartsModule { }
