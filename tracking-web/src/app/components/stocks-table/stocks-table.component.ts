import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { stockColumns } from '../../configuration/Properties';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnChanges {

  stockColumns = stockColumns;

  @Input() stocks: Stock[] = [];

  stockDataSource: MatTableDataSource<Stock>;

  constructor() { }

  ngOnChanges(): void {
    this.stockDataSource = new MatTableDataSource<Stock>(this.stocks);
  }

  sortData(event) {
    this.sort(event.active, event.direction === "asc");
  }

  private sort(key, asc = false) {
    this.stockDataSource = new MatTableDataSource<Stock>(this.stocks.sort((a, b) =>{
      if(a[key] < b[key]) return asc ? -1 : 1;
      else if(a[key] > b[key]) return asc ? 1 : -1;
      else return 0;
    }));
  }

}