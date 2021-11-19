import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/login`, {email, password})
            .pipe(map(resp => {
              const { token } = resp.data;
              const { data } = jwt_decode(token);
              const user: User = data;
              user.token = token;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }));
  }

  logout() {
    this.http.get(`${environment.apiUrl}/logout`)
      .subscribe(resp => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/auth/login']);
      });
  }

  forgot(email: string) {
    return this.http.post(`${environment.apiUrl}/password/forgot`, { email });
  }

  reset(token: string, email: string, password: string, password_confirmation: string) {
    return this.http.post(`${environment.apiUrl}/password/reset`, { email, token, password, password_confirmation });
  }

}
