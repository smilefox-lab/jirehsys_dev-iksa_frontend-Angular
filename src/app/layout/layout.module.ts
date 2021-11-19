import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChartsModule } from '../shared/modules/charts/charts.module';
import { TabsModule } from '../shared/modules/tabs/tabs.module';


@NgModule({
    imports: [
      CommonModule,
      LayoutRoutingModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatInputModule,
      MatSelectModule,
      FormsModule,
      ReactiveFormsModule,
      MatBadgeModule,
      FlexLayoutModule.withConfig({addFlexToParent: false}),
      ChartsModule,
      TabsModule,
    ],
    declarations: [
      LayoutComponent,
      TopnavComponent,
      SidebarComponent,
    ],
})
export class LayoutModule { }
