import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../actions.service';
import { Action } from '../model/Action';

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.css']
})
export class AllActionsComponent implements OnInit {
  private allActions: Array<Action> = [];
  private displayedColumns: string[] = ['type', 'Stock Name', 'Open Price', 'Action Price', 'Action Quantity', 'Profit / Loss'];

  constructor(private actionsService: ActionsService) {
    this.loadData();
   }

  loadData(){
    this.actionsService.getAllActions().subscribe(
      values => {this.allActions = values;});
  }

  calculateProfit(action: Action){
    let profit: number;
    if(action.type === "sell"){
      profit = action.priceAtAction - action.openedPrice;
    }
    else{
      profit = action.openedPrice - action.priceAtAction;
    }

    return (action.quantity * profit)
  }

  checkIfSell(type: string){
    if(type === "sell"){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit() {
  }

}
