import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { LeaseService } from '../../services/lease.service';
import { last, tap, map } from 'rxjs/operators';
import { DebtorService } from '../../services/debtor.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-lease',
  templateUrl: './lease.component.html',
  styleUrls: ['./lease.component.scss']
})
export class LeaseComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showLink = true;
  @Input() dateMonth: number = Date.now();
  @Input() col0 = 0;
  @Input() col1 = 1;
  @Input() showGraphLine = true;

  companiesIndicators$: Observable<any>;
  holdingLatest$: Observable<any>;
  holdingBefore$: Observable<any>;
  profitability$: Observable<any>;
  pieDate$: Observable<any>;
  lineDate$: Observable<any>;

  constructor(
    private leaseService: LeaseService,
    private debtorService: DebtorService,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.propertyService.getProfitability();
    this.holdingLatest$ = this.leaseService.holdingIndicatorsLatest();
    this.holdingBefore$ = this.leaseService.holdingIndicatorsBefore();
    this.companiesIndicators$ = this.leaseService.companiesIndicators$;
    this.profitability$ = this.propertyService.profitability$;
    this.pieDate$ = this.leaseService.pieDate();
    this.lineDate$ = this.debtorService.historyGraph$.pipe(
      map(points => points.reduce(
        (acc, point: any) => {
          acc[0].data = [ ...acc[0].data, { y: parseInt(point.default, 10), name: point.point_date } ];
          acc[1].data = [ ...acc[1].data, { y: parseInt(point.delay, 10), name: point.point_date } ];
          return acc;
        },
        [
          {
            type: 'line',
            color: '#febc2c',
            name: 'Mora',
            data: [],
          },
          {
            type: 'line',
            color: '#fd413c',
            name: 'Retraso',
            data: [],
          }
        ]
      ),
      )
    );
  }

  getOperator(latest: number, before: number) {
    return latest > before ? 'gt' : latest < before ? 'st' : 'eq';
  }

  getDiff(latest: number, before: number) {
    if ( parseFloat(latest?.toString()) === 0 || latest === before) {
      return 0;
    }

    return parseFloat((100 - (before * 100) / latest).toFixed(2));
  }

  selectClassIcon(operator: string) {
    if (operator === 'gt') {
      return 'mat-icon-rotate-positive';
    } else if (operator === 'st') {
      return 'mat-icon-rotate-negative';
    } else {
      return 'mat-icon-hidden';
    }
  }

  selectClasstitle(operator: string) {
    if (operator === 'gt') {
      return 'indicator-sub-title-positive';
    } else if (operator === 'st') {
      return 'indicator-sub-title-negative';
    } else {
      return 'indicator-sub-title-equal';
    }
  }


}
