import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SearchPropertyRoutingModule } from './search-property-routing.module';
import { SearchPropertyComponent } from './search-property.component';
import { PropertyComponent } from './components/property/property.component';
import { SearchAddonModule } from 'src/app/shared/modules/search-addon/search-addon.module';

@NgModule({
  declarations: [
    SearchPropertyComponent,
    PropertyComponent
  ],
  imports: [
    CommonModule,
    SearchPropertyRoutingModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    SearchAddonModule,
    MatPaginatorModule
  ]
})
export class SearchPropertyModule { }
