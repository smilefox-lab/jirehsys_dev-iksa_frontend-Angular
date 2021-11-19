import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from 'src/app/interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _companies: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);
  private _selectedCompany: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _selectedCompanyFiles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  readonly companies$: Observable<Company[]>;
  readonly selectedCompany$: Observable<string>;
  readonly selectedCompanyFiles$: Observable<string[]>;

  constructor(private http: HttpClient) {
    this.companies$ = this._companies.asObservable();
    this.selectedCompany$ = this._selectedCompany.asObservable();
    this.selectedCompanyFiles$ = this._selectedCompanyFiles.asObservable();
  }

  get companies(): Company[] {
    return this._companies.value;
  }

  set companies(value: Company[]) {
    this._companies.next(value);
  }

  get selectedCompany(): string {
    return this._selectedCompany.getValue();
  }

  set selectedCompany(value: string) {
    this._selectedCompany.next(value);

    let aux = this.companies.find(x => +x.id === +value);
    this.selectedCompanyFiles = aux? aux.files : [];
  }

  set selectedCompanyFiles(values: string[]) {
    this._selectedCompanyFiles.next(values);
  }

  get selectedCompanyFiles(): string[] {
    return this._selectedCompanyFiles.getValue();
  }

  getUserCompany() {
    return this.http.get((`${environment.apiUrl}/companies`))
      .pipe(map((resp: any) => resp.data))
      .subscribe(companies => this.companies = companies);
  }

  getSelectedCompany(id: string) {
    this.selectedCompany = id;
  }

  forceFileDownload(buffer, name) {
    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  }

  downloadFile(urlDownload, fileName) {
    urlDownload = urlDownload.replace('#', '%23');

    this.http
      .get(`${environment.apiUrl}/${urlDownload}`, { responseType: 'blob' })
      .pipe(map((resp: any) => resp))
      .subscribe(file => {
        this.forceFileDownload(file, fileName);
      });
  }
}
