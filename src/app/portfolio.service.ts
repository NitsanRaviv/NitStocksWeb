import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LineInPortfolio } from './model/LineInPortfolio';
@Injectable({providedIn: 'root'})
export class PortfolioService {

  public getPortfolio(): Observable<Array<LineInPortfolio>> {
    const url = `${environment.serverUrl}/portfolio`;
    return this.http.get<Array<LineInPortfolio>>(url);
  }

  public addToPortfolio(stockName: string, quantity: number) {
    const url = `${environment.serverUrl}/portfolio`;
    return this.http.post<LineInPortfolio>(url, {stockName: stockName, quantity: quantity});
  }

  public updatePortfolio(stockName: string, quantity: number) {
    const url = `${environment.serverUrl}/portfolio/`+ stockName;
    return this.http.put<LineInPortfolio>(url, {stockName: stockName, quantity: quantity});
  }


  public deleteFromPortfolio(stockName: string) {
    const url = `${environment.serverUrl}/portfolio/`+ stockName;
    return this.http.delete<void>(url);
  }


  constructor(private http: HttpClient) { }
}
