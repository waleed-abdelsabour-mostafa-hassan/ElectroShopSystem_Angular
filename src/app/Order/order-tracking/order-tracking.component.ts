import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  constructor(private dialog:MatDialogRef<OrderTrackingComponent>
    ,@Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  Orderconfirmed="step active";
  Pickedbycourier="step active";
  Ontheway="step active";
  Readyforpickup="step active";

  satus=  this.data.satus;
  ngOnInit(): void {

    console.log(this.satus==="Order confirmed");
    if(this.satus==="Order confirmed"){
      console.log("hi");
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step ";
      this.Ontheway="step ";
      this.Readyforpickup="step ";

    } else if(this.data.satus=="Picked by courier"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step ";
      this.Readyforpickup="step ";

    }else if(this.data.satus=="On the way"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step active";
      this.Readyforpickup="step ";

    }else if(this.data.satus=="Ready for pickup"){
      this.Orderconfirmed="step active";
      this.Pickedbycourier="step active";
      this.Ontheway="step active";
      this.Readyforpickup="step active";
    }else{
      this.Orderconfirmed="step ";
      this.Pickedbycourier="step ";
      this.Ontheway="step ";
      this.Readyforpickup="step ";
    }


  }
  Close(){this.dialog.close();}
}
