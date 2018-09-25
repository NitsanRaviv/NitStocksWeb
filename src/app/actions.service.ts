import { Injectable } from '@angular/core';
import { Action } from './model/Action';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class ActionsService {

  public getAllActions(): Observable<Array<Action>> {
    const url = `${environment.serverUrl}/actions`;
    return this.http.get<Array<Action>>(url);
  }

  public addNewAction(stockName: string, type: string, priceAtAction: number, openedPrice: number, quantity: number) {
    const url = `${environment.serverUrl}/actions`;
    return this.http.post<any>(url, {stockName: stockName, type: type,
       priceAtAction: priceAtAction, openedPrice: openedPrice, quantity: quantity });
  }


  constructor(private http: HttpClient) { }
}
