import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ResponseApi } from 'src/app/interfaces/response-api';
import { User } from 'src/app/interfaces/user';
import { CompanyService } from './company.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _me: BehaviorSubject<User> = new BehaviorSubject<User>({});
  public readonly me$: Observable<User> = this._me;

  constructor(
    private http: HttpClient,
    private company: CompanyService
  ) { }

  public get me(): User {
    return this._me.getValue();
  }

  getMe() {
    return this.http.get<ResponseApi>(`${environment.apiUrl}/me`)
            .pipe(
              map(resp => resp.data)
            )
            .subscribe((user: User) => {
              this._me.next(user);
            });
  }
}
