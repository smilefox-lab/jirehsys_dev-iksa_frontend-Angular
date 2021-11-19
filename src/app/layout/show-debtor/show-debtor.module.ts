import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { ShowDebtorRoutingModule } from './show-debtor-routing.module';
import { ShowDebtorComponent } from './show-debtor.component';
import { DebtorsModule } from 'src/app/shared/modules/debtors/debtors.module';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { SearchAddonModule } from 'src/app/shared/modules/search-addon/search-addon.module';
import { MatSortModule } from '@angular/material/sort';
import { ChartsModule } from 'src/app/shared/modules/charts/charts.module';


@NgModule({
  declarations: [ShowDebtorComponent],
  imports: [
    CommonModule,
    ShowDebtorRoutingModule,
    DebtorsModule,
    TabsModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    SearchAddonModule,
    ChartsModule
  ]
})
export class ShowDebtorModule { }
