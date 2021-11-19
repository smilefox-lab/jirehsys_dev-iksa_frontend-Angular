import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, merge } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  map,
  pluck,
  tap,
  mergeMap,
  groupBy,
  flatMap,
  toArray,
  reduce,
  mergeAll,
} from 'rxjs/operators';
import { Indicator } from 'src/app/interfaces/indicator';

interface Filter {
  find?: string;
  type?: string;
  company?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LeaseService {
  private _indicators: BehaviorSubject<Indicator[]> = new BehaviorSubject<Indicator[]>([]);
  readonly indicators$: Observable<any[]>;

  private _list: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly list$: Observable<any[]>;

  private _companiesIndicators: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly companiesIndicators$: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.indicators$ = this._indicators.asObservable();
    this.list$ = this._list.asObservable();
    this.companiesIndicators$ = this._companiesIndicators.asObservable();
  }

  get indicators(): any[] {
    return this._indicators.value;
  }

  set indicators(value: any[]) {
    this._indicators.next(value);
  }

  get list(): any[] {
    return this._list.value;
  }

  set list(value: any[]) {
    this._list.next(value);
  }

  get companiesIndicators(): any[] {
    return this._companiesIndicators.value;
  }

  set companiesIndicators(value: any[]) {
    this._companiesIndicators.next(value);
  }

  getIndicators(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http
      .get<any>(`${environment.apiUrl}/real-estate/leases/indicators`, { params })
      .pipe(pluck('data'))
      .subscribe((indicators) => (this.indicators = indicators));
  }

  getCompaniesIndicators(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http
      .get<any>(`${environment.apiUrl}/real-estate/leases/companies-indicators`, { params })
      .pipe(
        pluck('data'),
        map(indicators => indicators.map(indicator => {
            indicator.progress = indicator.paid * 100 / indicator.expected;
            return indicator;
        })),
      )
      .subscribe((indicators) => this.companiesIndicators = indicators);
  }

  holdingIndicatorsLatest() {
    return this.indicators$.pipe(
      map(indicators => indicators
        .filter((indicator: Indicator) => indicator.status === 'latest')
        .reduce((acc, item: any) => {
          acc.expected = acc.expected + parseFloat(item.expected);
          acc.paid = acc.paid + parseFloat(item.paid);
          acc.owed = acc.owed + parseFloat(item.owed);
          acc.progress = parseFloat(((acc.paid * 100) / acc.expected).toFixed(2));
          return acc;
        }, {
          expected: 0,
          paid: 0,
          owed: 0,
          progress: 0
        })
      ),
    );
  }

  holdingIndicatorsBefore() {
    return this.indicators$.pipe(
      map(indicators => indicators
        .filter(indicator => indicator.status === 'before')
        .reduce((acc, item: any) => {
          acc.expected = acc.expected + parseFloat(item.expected);
          acc.paid = acc.paid + parseFloat(item.paid);
          acc.owed = acc.owed + parseFloat(item.owed);
          acc.progress = parseFloat(((acc.paid * 100) / acc.expected).toFixed(2));
          return acc;
        }, {
          expected: 0,
          paid: 0,
          owed: 0,
          progress: 0
        })
      ),
    );
  }

  companiesIndicatorsBefore() {
    return this.indicators$.pipe(
      map((indicators) => indicators
        .filter(indicator => indicator.status === 'before')
        .map((indicator: Indicator) => {
          indicator.progress = parseFloat(((indicator.paid * 100) / indicator.expected).toFixed(2));
          return indicator;
        })
      ),
    );
  }

  pieDate() {
    return this.holdingIndicatorsLatest().pipe(
      map((indicator: Indicator) => [{ name: 'Pagados', y: indicator.paid } , { name: 'Deudores', y: indicator.owed }]),
    );
  }

  getList(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }
    return this.http
      .get<any>(`${environment.apiUrl}/real-estate/leases/list`, { params })
      .pipe(pluck('data'))
      .subscribe((data) => (this.list = data));
  }
}
