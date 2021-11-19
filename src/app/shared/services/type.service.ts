import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pluck, flatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private _type: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  readonly type$: Observable<any>;

  constructor(
    private http: HttpClient
  ) {
    this.type$ = this._type.asObservable();
  }

  get type(): any {
    return this._type.value;
  }

  set type(value: any) {
    this._type.next(value);
  }

  getType() {
    return this.http.get<any>(`${environment.apiUrl}/real-estate/types/list`)
      .pipe(
        pluck('data'),
      )
      .subscribe(type => this.type = type);
  }
}
