import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/@electronic/model/Order';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { OrderService } from 'src/@electronic/services/order.service';
import { OrderDaitelsComponent } from 'src/app/Order/order-daitels/order-daitels.component';
import { OrderTrackingComponent } from 'src/app/Order/order-tracking/order-tracking.component';
import { OrderStatusComponent } from '../order-status/order-status.component';
import { OrderUserComponent } from '../order-user/order-user.component';
import { PrintreprtorderComponent } from '../printreprtorder/printreprtorder.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  additionalDetails!: string;
  displayedColumns: string[] = ['id', 'img','total_Price', 'create_Date', 'count_Product','action','satus'];
  dataSource!: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userID!:string;
  search:any;
  constructor(private orderserviec:OrderService,
    private crypt: CryptService,private dialog:MatDialog) {

    }

    OrderTracking(status:any){
      const dialogRef = this.dialog.open(OrderStatusComponent, {
        width:'100%',data:status,height:'85%'
     // data: {name: this.name, animal: this.animal},
   });

   dialogRef.afterClosed().subscribe((result) => {
     console.log('The dialog was closed');
     // this.animal = result;
   });

    }

    OpenReport(id:number){
      const dialogRef = this.dialog.open(PrintreprtorderComponent, {
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

iduuser!:string;
  ngOnInit(): void {
    this.gettoken();
    this.orderserviec.GetAllOrder().subscribe(e=>{

      this.dataSource = new MatTableDataSource(e);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  GetUserDetails(userid:string){
    const dialogRef = this.dialog.open(OrderUserComponent, {
      width:'40%',data:userid,height:'80%'
   // data: {name: this.name, animal: this.animal},
 });

 dialogRef.afterClosed().subscribe((result) => {
   console.log('The dialog was closed');
   // this.animal = result;
 });
  }



  applyFilter(event: any) {
    // const filterValue = (event.target as HTMLInputElement).value; console.log(filterValue);
    this.dataSource.filter = event.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
