
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { LeaseService } from 'src/app/shared/services/lease.service';
import { DebtorService } from 'src/app/shared/services/debtor.service';
import { TopnavService } from 'src/app/shared/services/topnav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sections: any[] = [
    {
      name: 'Resumen',
      href: '/dashboard'
    },
    {
      name: 'Deudores',
      href: '/debtors'
    },
    {
      name: 'Propiedades',
      href: '/properties'
    },
    {
      name: 'Arriendo',
      href: '/leases'
    },
  ];
  dateSelect: number;

  constructor(
    private topnavService: TopnavService,
    private leaseService: LeaseService,
    private debtorService: DebtorService
  ) {
  }

  ngOnInit() {
    this.topnavService.hideSelect = false;
    this.dateSelect = Date.now();
  }

  filterByDate(event: MatDatepickerInputEvent<Date>) {
    const date = event?.value?.toLocaleDateString();
    this.leaseService.getIndicators({ date });
    this.leaseService.getCompaniesIndicators({ date });
    this.debtorService.getOverview({ date });
    this.dateSelect = event?.value?.getTime();
  }
}
