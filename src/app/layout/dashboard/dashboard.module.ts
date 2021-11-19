import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PropertyAvailableComponent } from './components/property-available/property-available.component';
import { ChartsModule } from 'src/app/shared/modules/charts/charts.module';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { LeaseModule } from 'src/app/shared/modules/leases/lease.module';
import { GeneralInformationModule } from 'src/app/shared/modules/general-information/general-information.module';
import { DebtorsModule } from 'src/app/shared/modules/debtors/debtors.module';
import { CompanyFilesComponent } from './components/company-files/company-files.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      DashboardRoutingModule,
      MatGridListModule,
      MatCardModule,
      MatTabsModule,
      MatTableModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      MatListModule,
      FlexLayoutModule.withConfig({addFlexToParent: false}),
      ChartsModule,
      TabsModule,
      LeaseModule,
      GeneralInformationModule,
      DebtorsModule
    ],
    declarations: [
      DashboardComponent,
      PropertyAvailableComponent,
      CompanyFilesComponent
    ],
})
export class DashboardModule {}
