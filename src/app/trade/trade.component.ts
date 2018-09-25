import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { PortfolioService } from '../portfolio.service';
import { ActionsService } from '../actions.service';
import { StocksService } from '../stocks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  private tradeType: string;
  private stockName: string;
  private stockQuantity: number = 0;
  private stockCurrentPrice: number;
  private stockOpenedPrice: number;
  private tradeForm: FormGroup;
  private inputQuantity: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private portfolioServicce: PortfolioService, private actionsService: ActionsService,
    private stockService: StocksService) { 
    this.getTradeData();
    this.getStock();
    this.getStockQuantity();
    this.updateStockPrices();
    this.addtradeForm();
  }

  getStock(){
    this.stockService.getStock(this.stockName).subscribe(
      values => {
        this.stockCurrentPrice = values.currentPrice;
        this.stockOpenedPrice = values.openedPrice;
      });
  }

  updateStockPrices(){
    this.stockService._stocks.subscribe(
      values => {
        values.forEach(stock =>{
          if(stock.name === this.stockName){
            this.stockOpenedPrice = stock.openedPrice;
            this.stockCurrentPrice = stock.currentPrice;
          }
        })
      });
  }

  getStockQuantity(){
    this.portfolioServicce.getPortfolio().subscribe(
      values => {
        values.forEach(stock =>{
          if(stock.stockName === this.stockName){
            this.stockQuantity = stock.quantity;
          }
        })
      });
  }

  getTradeData(){
    this.activatedRoute.params.subscribe(params => {
    this.tradeType = params['type']; 
    this.stockName = params['selectedStockName'];
    });
  }

  checkIfSell(){
    if(this.tradeType === "sell"){
      return true;
    }
    else{
      return false;
    }
  }

  addtradeForm(){
    this.tradeForm =  this.fb.group({
    quantity: new FormControl("", 
      Validators.compose([Validators.required, Validators.pattern("[0-9]+")])) 
    });
  }

  makeTrade(){
    this.inputQuantity = +this.tradeForm.controls['quantity'].value;
    if(this.tradeType === "sell"){
      this.sellTrade();
    }
    else{
      this.buyTrade();
    }
  }

  buyTrade(){
    let newQuantity =  this.stockQuantity + this.inputQuantity;
    if(this.stockQuantity == 0){
      this.portfolioServicce.addToPortfolio(this.stockName,newQuantity).subscribe(() => {});
    }
    else{
      this.portfolioServicce.updatePortfolio(this.stockName,newQuantity).subscribe(() => {});
    }
    this.actionsService.addNewAction(this.stockName,"buy",this.stockCurrentPrice,
    this.stockOpenedPrice, this.inputQuantity).subscribe(() => {});
    alert('Purchase action successful');
    this.router.navigate(['/', 'home']);
  }

  sellTrade(){
    if( this.inputQuantity > this.stockQuantity){
      alert("Pay attention to your stock quantity => " + this.stockQuantity + " .  Please try again");
    }
    else{
      let newQuantity:number =  this.stockQuantity - this.inputQuantity;
      if(newQuantity == 0){
        this.portfolioServicce.deleteFromPortfolio(this.stockName).subscribe(() => {});
      }
      else if(this.stockQuantity == 0){
        this.portfolioServicce.addToPortfolio(this.stockName,newQuantity).subscribe(() => {});
      }
      else{
        this.portfolioServicce.updatePortfolio(this.stockName,newQuantity).subscribe(() => {});
      }
      this.actionsService.addNewAction(this.stockName,"sell",this.stockCurrentPrice,
      this.stockOpenedPrice,this.inputQuantity).subscribe(() => {});
      alert('Sale action successful');
      this.router.navigate(['/', 'home']);
    }
  }


  ngOnInit() {
  }

}
