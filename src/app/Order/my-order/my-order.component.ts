import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { Order } from 'src/@electronic/model/Order';
import { CryptService } from 'src/@electronic/services/crypt.service';import { OrderService } from 'src/@electronic/services/order.service';
import { OrderDaitelsComponent } from '../order-daitels/order-daitels.component';
import { OrderTrackingComponent } from '../order-tracking/order-tracking.component';









@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {


  additionalDetails!: string;
  displayedColumns: string[] = ['id', 'total_Price', 'create_Date', 'count_Product','action','status'];
  dataSource!: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userID!:string;
  search:any;
  constructor(private orderserviec:OrderService,
    private crypt: CryptService,private dialog:MatDialog) {

    }
    OrderTracking(status:any){
      const dialogRef = this.dialog.open(OrderTrackingComponent, {
        width:'100%',data:status,height:'85%'
     // data: {name: this.name, animal: this.animal},
   });

   dialogRef.afterClosed().subscribe((result) => {
     console.log('The dialog was closed');
     // this.animal = result;
   });

    }
    OpenReport(id:number){
      const dialogRef = this.dialog.open(OrderDaitelsComponent, {
        width:'100%',data:id
     // data: {name: this.name, animal: this.animal},
   });

   dialogRef.afterClosed().subscribe((result) => {
     console.log('The dialog was closed');
     // this.animal = result;
   });


    }

    gettoken(){

      if (localStorage.getItem('token')) {
        var token = JSON.parse(
          this.crypt.Decrypt(localStorage.getItem('token')!)
        );

        this.userID = token.id;

      }}

  ngOnInit(): void {
    this.gettoken();
    this.orderserviec.GetAllOrderByUserId(this.userID).subscribe(e=>{
      this.dataSource = new MatTableDataSource(e);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }





  applyFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value; console.log(filterValue);
    this.dataSource.filter = event.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
class Product{
  name!: string;
  price!: number;
  qty!: number;
}
class Invoice{
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;
  products: any;
  additionalDetails: any;
}
