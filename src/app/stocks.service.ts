import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Stock } from '../app/model/Stock';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root'})
export class StocksService {

  private socket;
  private allStocksFromServer: Array<Stock> = [];
  public _stocks = new Subject<Array<Stock>>();

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<Array<Stock>> {
    const url = `${environment.serverUrl}/stocks`;
    return this.http.get<Array<Stock>>(url);
  }

  getStock(stockName: string): Observable<Stock> {
    const url = `${environment.serverUrl}/stocks/`+ stockName ;
    return this.http.get<Stock>(url);
  }

  updateStocks(){
      this.socket = io(environment.serverUrl);
      this.socket.on('priceUpdate', allStocks => {
            this.allStocksFromServer = allStocks;
            this._stocks.next(this.allStocksFromServer);
        });
  }
}