import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stock } from '../../models/stock.model';
import { stockStatus } from '../../configuration/Properties';
import { WarehousesService } from '../../services/warehouses.service';
import { Warehouse } from 'src/app/models/warehouse.model';

@Component({
  selector: 'stock-dialog',
  templateUrl: './stock-dialog.html',
  styleUrls: ['./stock-dialog.css']
})
export class StockDialog implements OnInit{

  public stockStatus = stockStatus;
  public warehouses: Warehouse[] = [];

  @Output() save: EventEmitter<Stock> = new EventEmitter();

  constructor(
    private warehousesService: WarehousesService,
    public dialogRef: MatDialogRef<StockDialog>,
    @Inject(MAT_DIALOG_DATA) public stock: Stock) {}

  ngOnInit(){
    this.warehousesService.getWarehouses().subscribe((warehouses: Warehouse[])=>{
      this.warehouses = warehouses;
    });
  }

  onNoClick() {
    this.closeDialog();
  }

  onSaveClick(){
    this.save.emit(this.stock);
  }

  closeDialog(){
    this.dialogRef.close();
  }
  setErrors(){
    
  }

}
