import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as More from 'highcharts/highcharts-more.src';
import * as SolidGauge from 'highcharts/modules/solid-gauge';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CL';
registerLocaleData(localeCl, 'cl');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './shared/helper/jwt.interceptor';
import { ErrorInterceptor } from './shared/helper/error.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AlertComponent } from './shared/modules/alert/alert.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { WholeNumberPipe } from './shared/pipes/whole-number.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './dutch-paginator-intl';

export function highchartsModules() {
  return [More, SolidGauge];
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    WholeNumberPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgxPageScrollCoreModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor, multi: true
    },
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: highchartsModules
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-CL'
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CL'
    },
    {
      provide: MatPaginatorIntl,
      useValue: getDutchPaginatorIntl()
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
