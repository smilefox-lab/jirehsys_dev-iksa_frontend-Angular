import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pluck, tap, flatMap, map } from 'rxjs/operators';
import { Overview } from 'src/app/interfaces/overview';

interface Filter {
  find?: string;
  type?: string;
  company?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private _overview: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  readonly overview$: Observable<any[]>;

  private _list: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly list$: Observable<any[]>;

  private _top: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly top$: Observable<any[]>;

  private _historyGraph: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly historyGraph$: Observable<any[]>;

  constructor(
    private http: HttpClient
  ) {
    this.overview$ = this._overview.asObservable();
    this.list$ = this._list.asObservable();
    this.top$ = this._top.asObservable();
    this.historyGraph$ = this._historyGraph.asObservable();
  }

  get overview(): any {
    return this._overview.value;
  }

  set overview(value: any) {
    this._overview.next(value);
  }

  get list(): any[] {
    return this._list.value;
  }

  set list(value: any[]) {
    this._list.next(value);
  }

  get top(): any[] {
    return this._top.value;
  }

  set top(value: any[]) {
    this._top.next(value);
  }

  get historyGraph(): any[] {
    return this._historyGraph.value;
  }

  set historyGraph(value: any[]) {
    this._historyGraph.next(value);
  }

  getOverview(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<any>(`${environment.apiUrl}/real-estate/debtors/overview`, { params })
      .pipe(
        pluck('data'),
      )
      .subscribe(overview => this.overview = overview);
  }

  overviewLatest() {
    return this.overview$.pipe(

      map(indicators => indicators
        .filter(indicator => indicator.status === 'latest')
      ),
      flatMap(indicator => indicator),
    );
  }

  solidGaugeData() {
    return this.overviewLatest().pipe(
      map((overview: Overview) => {
        const total: number = parseInt(overview.total_owed) + parseInt(overview.total_paid);
        return {
          paid: parseFloat(((parseInt(overview.total_paid) / total ) * 100).toFixed(2)),
          owed: parseFloat(((parseInt(overview.total_owed) / total) * 100).toFixed(2))
        };
      }),
    );
  }

  overviewBefore() {
    return this.overview$.pipe(
      map(indicators => indicators
        .filter(indicator => indicator.status === 'before')
      ),
      flatMap(indicator => indicator),
    );
  }

  getTop(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<any>(`${environment.apiUrl}/real-estate/debtors/top`, { params })
      .pipe(
        pluck('data'),
      )
      .subscribe(data => this.top = data);
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
    return this.http.get<any>(`${environment.apiUrl}/real-estate/debtors/list`, { params })
      .pipe(
        pluck('data'),
      )
      .subscribe(data => this.list = data);
  }


  getHistoryGraph(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<any>(`${environment.apiUrl}/real-estate/debtors/history-graph`, { params })
      .pipe(
        pluck('data'),
      )
      .subscribe(data => this.historyGraph = data);
  }


}
