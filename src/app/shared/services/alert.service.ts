import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _list: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly list$: Observable<any[]>;

  constructor(
    private http: HttpClient
  ) {
    this.list$ = this._list.asObservable();
  }

  get list(): any[] {
    return this._list.value;
  }

  set list(value: any[]) {
    this._list.next(value);
  }

  getList() {
    return this.http.get<any>(`${environment.apiUrl}/real-estate/alerts/list`)
      .pipe(
        pluck('data'),
      )
      .subscribe(data => this.list = data);
  }

}
