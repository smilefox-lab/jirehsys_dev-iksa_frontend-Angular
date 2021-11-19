import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { ShowPropertyComponent } from './show-property.component';
import { ShowPropertyRoutingModule } from './show-property-routing.module';
import { environment } from 'src/environments/environment';
import { TabsModule } from 'src/app/shared/modules/tabs/tabs.module';
import { ChartsModule } from 'src/app/shared/modules/charts/charts.module';

@NgModule({
  declarations: [
    ShowPropertyComponent
  ],
  imports: [
    CommonModule,
    ShowPropertyRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    ChartsModule,
    MatIconModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSortModule,
    MatProgressBarModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    AgmCoreModule.forRoot({
      apiKey: environment.maps
    }),
    MatCarouselModule.forRoot(),
  ],
})
export class ShowPropertyModule { }
