import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { GeneralInformationComponent } from './general-information.component';


@NgModule({
  declarations: [
    GeneralInformationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
  ],
  exports: [
    GeneralInformationComponent
  ]
})
export class GeneralInformationModule { }
