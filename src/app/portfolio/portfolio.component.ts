import { Component, OnInit } from '@angular/core';
import { LineInPortfolio } from '../model/LineInPortfolio';
import { PortfolioService } from '../portfolio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  private thePortfolio: Array<LineInPortfolio> = [];
  private displayedColumns: string[] = ['Stock Name', 'Quantity', 'Trade'];

  constructor(private portfolioServicce: PortfolioService, private router: Router) {
     this.loadData();
   }

  loadData(){
    this.portfolioServicce.getPortfolio().subscribe(
      values => {this.thePortfolio = values;});
  }

  goToTrade(selectedStockName: String, type: string){
    this.router.navigate(['/', 'trade', type, selectedStockName]);    
   }

  ngOnInit() {
  }

}
