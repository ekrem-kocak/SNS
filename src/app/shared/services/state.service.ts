import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  _loading = new BehaviorSubject(false);

  constructor() { }

  setLoading(state: boolean) {
    this._loading.next(state);
  }
}
