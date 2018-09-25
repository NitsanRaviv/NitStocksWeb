export interface Action{
    stockName: string;
    type: string;
    priceAtAction: number;
    openedPrice: number;
    quantity: number;
}