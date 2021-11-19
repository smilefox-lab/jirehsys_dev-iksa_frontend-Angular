import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DebtorService } from '../../services/debtor.service';
import { Observable } from 'rxjs';
import { flatMap, tap, map, last } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.scss']
})
export class DebtorsComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showLink = true;
  @Input() dateMonth: number = Date.now();

  overviewLatest$: Observable<any>;
  overviewGraph$: Observable<any>;
  overviewBefore$: Observable<any>;
  top$: Observable<any[]>;

  constructor(private debtorService: DebtorService) { }

  ngOnInit(): void {
    this.debtorService.getTop();
    this.overviewLatest$ = this.debtorService.overviewLatest();
    this.overviewBefore$ = this.debtorService.overviewBefore();
    this.top$ = this.debtorService.top$;
    this.overviewGraph$ = this.debtorService.solidGaugeData();
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
