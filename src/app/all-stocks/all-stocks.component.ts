import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/Stock';
import { StocksService } from '../stocks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-stocks',
  templateUrl: './all-stocks.component.html',
  styleUrls: ['./all-stocks.component.css']
})

export class AllStocksComponent implements OnInit {
  private stocks: Array<Stock>;
 

  constructor(private stockService: StocksService, private router: Router){
    this.loadAllStocks();
    this.updateStocks();
   }

   loadAllStocks(){
    this.stockService.getAllStocks().subscribe(
      values => {this.stocks = values;});

   }
   updateStocks(){
    this.stockService.updateStocks();
    this.stockService._stocks.subscribe(
      (values: Array<Stock>) => {
        this.stocks = values; 
      });
   }

   stockRising(openedPrice: number, currentPrice: number){
       return currentPrice >= openedPrice;
   }

   goToTrade(selectedStockName: String, type: string){
    this.router.navigate(['/', 'trade', type, selectedStockName]);    
   }

  ngOnInit() {}

}
