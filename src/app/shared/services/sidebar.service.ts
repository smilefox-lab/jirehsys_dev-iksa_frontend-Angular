import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _expanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly expanded$: Observable<boolean>;

  constructor() {
    this.expanded$ = this._expanded.asObservable();
  }

  get expanded(): boolean {
    return this._expanded.value;
  }

  set expanded(value: boolean) {
    this._expanded.next(value);
  }

  public toggle() {
    this._expanded.next(!this._expanded.value);
  }
}
