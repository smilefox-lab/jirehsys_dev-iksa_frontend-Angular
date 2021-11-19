import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MIndicadorClService {

  private _indicators: BehaviorSubject<object> = new BehaviorSubject<object>({});
  readonly indicators$ = this._indicators.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getIndicator() {
    this.http.get<any>(`https://mindicador.cl/api`)
      .pipe(
        map((resp: any) => {
          return {
            uf: resp.uf.valor,
            usd: resp.dolar.valor,
            utm: resp.utm.valor,
          };
        })
      )
      .subscribe(indicators => this._indicators.next(indicators));
  }
}
