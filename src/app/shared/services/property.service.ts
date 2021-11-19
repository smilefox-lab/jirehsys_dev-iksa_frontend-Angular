
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, pluck, flatMap, mergeMap, groupBy, toArray, reduce, skip, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { Company } from 'src/app/interfaces/company';

interface Filter {
  find?: string;
  type?: string;
  company?: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private _byTypeAndCompany: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  readonly byTypeAndCompany$: Observable<any[]>;

  private _properties: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  readonly properties$: Observable<any[]>;

  private _propertiesByContract: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  readonly propertiesByContract$: Observable<any[]>;

  private _propertiesByStatusAndType: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  readonly propertiesByStatusAndType$: Observable<any[]>;

  private _propertiesByStatus: BehaviorSubject<Property[]> = new BehaviorSubject<Property[]>([]);
  readonly propertiesByStatus$: Observable<any[]>;

  private _profitability: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  readonly profitability$: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.byTypeAndCompany$ = this._byTypeAndCompany.asObservable();
    this.properties$ = this._properties.asObservable();
    this.propertiesByContract$ = this._propertiesByContract.asObservable();
    this.propertiesByStatusAndType$ = this._propertiesByStatusAndType.asObservable();
    this.propertiesByStatus$ = this._propertiesByStatus.asObservable();
    this.profitability$ = this._profitability.asObservable();
  }

  get byTypeAndCompany(): any[] {
    return this._byTypeAndCompany.value;
  }

  set byTypeAndCompany(value: any[]) {
    this._byTypeAndCompany.next(value);
  }

  get properties(): any[] {
    return this._properties.value;
  }

  set properties(value: any[]) {
    this._properties.next(value);
  }

  get propertiesByContract(): any[] {
    return this._propertiesByContract.value;
  }

  set propertiesByContract(value: any[]) {
    this._propertiesByContract.next(value);
  }

  get propertiesByStatusAndType(): any[] {
    return this._propertiesByStatusAndType.value;
  }

  set propertiesByStatusAndType(value: any[]) {
    this._propertiesByStatusAndType.next(value);
  }

  get propertiesByStatus(): any[] {
    return this._propertiesByStatus.value;
  }

  set propertiesByStatus(value: any[]) {
    this._propertiesByStatus.next(value);
  }

  get profitability(): any[] {
    return this._profitability.value;
  }

  set profitability(value: any[]) {
    this._profitability.next(value);
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
    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/list`, { params })
      .pipe(
        pluck('data'),
      ).subscribe(data => this.properties = data);
  }


  getListByContract(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }
    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/payments`, { params })
      .pipe(
        pluck('data'),
      ).subscribe(data => this.propertiesByContract = data);
  }

  getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/${id}`)
      .pipe(
        pluck('data'),
      );
  }

  getByTypeAndCompany() {
    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/type/company`)
      .pipe(
        pluck('data'),
      )
      .subscribe(data => this.byTypeAndCompany = data);
  }

  summaryByType() {
    return this.byTypeAndCompany$
      .pipe(
        mergeMap(data => from(data).pipe(
          groupBy((type: any) => type.id),
          flatMap(group$ => group$.pipe(
            reduce((acc, item: any) => {
              acc.name = item.name;
              acc.quantity = acc.quantity + parseInt(item.quantity);
              acc.square = acc.square + parseInt(item.square);
              return acc;
            }, {
              name: '',
              quantity: 0,
              square: 0,
            })
          )),
          toArray(),
          map(summary => summary.reduce((acc, item: any) => {
            acc.quantity = acc.quantity + parseInt(item.quantity);
            acc.square = acc.square + parseInt(item.square);
            acc.type = [ ...acc.type, item];
            return acc;
          }, {
            quantity: 0,
            square: 0,
            type: []
          }))
        )),
      );
  }

  summaryByCompany() {
    return this.byTypeAndCompany$
      .pipe(
        mergeMap(data => from(data).pipe(
          groupBy((type: any) => type.company_id),
          flatMap(group$ => group$.pipe(
            reduce((acc, item: any) => {
              acc.company_id = item.company_id;
              acc.company = item.company;
              acc.quantity = acc.quantity + parseInt(item.quantity);
              acc.square = acc.square + parseInt(item.square);
              acc.square_build = acc.square_build + parseInt(item.square_build);
              acc.type = [ ...acc.type, item ];
              return acc;
            }, {
              company_id: null,
              company: '',
              quantity: 0,
              square: 0,
              square_build: 0,
              type: []
            }),
          )),
          toArray()
        )),
      );
  }

  getByTypeStatus(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }
    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/type/status`, { params })
      .pipe(
        pluck('data'),
      ).subscribe(data => this.propertiesByStatusAndType = data);
  }

  groupByStatus() {
    return this.propertiesByStatusAndType$.pipe(
      mergeMap(data => from(data).pipe(
        groupBy((property: any) => property.status),
        flatMap(group$ => group$.pipe(
          reduce((acc, item: any) => {
            acc.status = item.status;
            acc.quantity += item.quantity;
            acc.items = [ ...acc.items, item ];
            return acc;
          }, {
            status: '',
            quantity: 0,
            items: []
          }),
        )),
        toArray()
      )),
    );
  }

  getSummaryByGraph() {
    return this.propertiesByStatusAndType$
      .pipe(
        mergeMap(data => from(data).pipe(
          groupBy((property: any) => property.name),
          flatMap(group$ => group$.pipe(
            reduce((acc, item: any) => {
              acc.name = item.name;
              acc.y += item.quantity;
              return acc;
            }, {
              name: '',
              y: 0
            }),
          )),
          toArray(),
        )),
      );
  }

  getByStatus(filter: Filter = {}) {
    let params = new HttpParams();
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        if (filter[key]) {
          params = params.append(key, filter[key]);
        }
      }
    }

    return this.http.get<any>(`${environment.apiUrl}/real-estate/properties/status`, { params })
      .pipe(
        map(resp => Object.values(resp.data)),
        mergeMap(data => from(data).pipe(
          groupBy((property: any) => property.status),
          flatMap(group$ => group$.pipe(
            reduce((acc, item: any) => {
              acc.status = item.status;
              acc.items = [ ...acc.items, item ];
              return acc;
            }, {
              status: '',
              items: []
            }),
          )),
          toArray(),
        )),
      )
      .subscribe(data => this.propertiesByStatus = data);
  }


  statusAvailable() {
    return this.propertiesByStatus$.pipe(
      map(properties => properties.filter(property => property.status.toLowerCase() === 'disponible')),
    );
  }

  statusRented() {
    return this.propertiesByStatus$.pipe(
      map(properties => properties.filter(property => property.status.toLowerCase() === 'arrendada')),
    );
  }

  getProfitability() {
    return this.http.get<any>(`${environment.apiUrl}/real-estate/indicators/profitability`)
      .pipe(
        pluck('data'),
      ).subscribe(data => this.profitability = data);
  }

  paginateProperty(currentPage = 0, pageSize = 20) {
    return this.properties$.pipe(
      mergeMap(data => from(data).pipe(
        skip(currentPage * pageSize),
        take(pageSize),
        toArray(),
      )),
    );
  }
}
