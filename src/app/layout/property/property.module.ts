import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationModule } from 'src/app/shared/modules/general-information/general-information.module';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

import { PropertyRoutingModule } from './property-routing.module';
import { PropertyComponent } from './property.component';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { SearchAddonModule } from 'src/app/shared/modules/search-addon/search-addon.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [PropertyComponent],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    GeneralInformationModule,
    TabsModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    SearchAddonModule
  ]
})
export class PropertyModule { }
