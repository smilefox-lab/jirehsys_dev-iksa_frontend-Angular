import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopnavService {
  private _hideSelect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly hideSelect$: Observable<boolean>;

  constructor() {
    this.hideSelect$ = this._hideSelect.asObservable();
  }

  get hideSelect(): boolean {
    return this._hideSelect.value;
  }

  set hideSelect(value: boolean) {
    this._hideSelect.next(value);
  }
}
