import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Order } from 'src/@electronic/model/Order';
import { OrderService } from 'src/@electronic/services/order.service';
import { OrderTrackingComponent } from 'src/app/Order/order-tracking/order-tracking.component';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  constructor(private tost:NgToastService, private orderservise:OrderService,private dialog:MatDialogRef<OrderStatusComponent>
    ,@Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  Orderconfirmed="step active";
  Pickedbycourier="step active";
  Ontheway="step active";
  Readyforpickup="step active";


OrderR!:Order;
  satus=  this.data.satus;

  ngOnInit(): void {
    this.GetOrder();


  }




  Close(){this.dialog.close();}



  EditStatus(value:any){
      this.Edit(value);

  }

Edit(status:string){

  this.orderservise.UpdateStatusOrder( this.data.id,status).subscribe(e=>{
    this.GetOrder();
    this.tost.success({ detail:"Order Tracking",summary:e+" "+status,duration:1000});
  },  err=>{
    this.tost.warning({ detail:"Order Tracking",summary:err.error,duration:1000});

  })
}

GetOrder(){
  this.orderservise.GetOrderById(this.data.id).subscribe(h=>{
    this.OrderR=h;
    console.log(this.OrderR.satus);
    if(this.OrderR.satus==="Order confirmed"){
      console.log(this.OrderR.satus);
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step ";
      this.Ontheway="step ";
      this.Readyforpickup="step ";
      this.satus=this.OrderR.satus;

    } else if(this.OrderR.satus=="Picked by courier"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step ";
      this.Readyforpickup="step ";
      this.satus=this.OrderR.satus;
    }else if(this.OrderR.satus=="On the way"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step active";
      this.Readyforpickup="step ";
      this.satus=this.OrderR.satus;
    }else if(this.OrderR.satus=="Ready for pickup"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step active";
      this.Readyforpickup="step active";

      this.satus=this.OrderR.satus;

    }else{
      this.Orderconfirmed="step ";
      this.Pickedbycourier="step ";
      this.Ontheway="step ";
      this.Readyforpickup="step ";
    }
  },  err=>{

  })
}


}
