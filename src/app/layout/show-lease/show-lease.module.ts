import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShowLeaseRoutingModule } from './show-lease-routing.module';
import { ShowLeaseComponent } from './show-lease.component';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { LeaseModule } from 'src/app/shared/modules/leases/lease.module';
import { SearchAddonModule } from 'src/app/shared/modules/search-addon/search-addon.module';
import { MatSortModule } from '@angular/material/sort';
import { ChartsModule } from 'src/app/shared/modules/charts/charts.module';


@NgModule({
  declarations: [ShowLeaseComponent],
  imports: [
    CommonModule,
    ShowLeaseRoutingModule,
    LeaseModule,
    TabsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    SearchAddonModule,
    ChartsModule,
  ]
})
export class ShowLeaseModule { }
