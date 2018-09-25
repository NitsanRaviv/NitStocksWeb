import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { AllStocksComponent } from './all-stocks/all-stocks.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {StocksService} from './stocks.service'
import { HttpClientModule } from '@angular/common/http';
import { AllActionsComponent } from './all-actions/all-actions.component';
import { ActionsService } from './actions.service';
import { PortfolioService } from './portfolio.service';
import { TradeComponent } from './trade/trade.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AllStocksComponent,
    AllActionsComponent,
    TradeComponent,
    PortfolioComponent,
    HomeMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [
    StocksService,
    ActionsService,
    PortfolioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
