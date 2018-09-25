import { AllStocksComponent } from './all-stocks/all-stocks.component';
import { Route } from '@angular/router';
import { AllActionsComponent } from './all-actions/all-actions.component';
import { TradeComponent } from './trade/trade.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

    export const ROUTES: Route[] = [
    {path: 'home', component: AllStocksComponent},
    {path: 'actionHistory', component: AllActionsComponent},
    {path: 'portfolio', component: PortfolioComponent},
    {path: 'trade/:type/:selectedStockName', component: TradeComponent},
    {path: '', pathMatch: 'full', redirectTo: '/home'}
];
