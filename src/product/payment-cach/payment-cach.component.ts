import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { Payment } from 'src/@electronic/model/payment';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { OrderService } from 'src/@electronic/services/order.service';
import { CartShopingComponent } from '../cart-shoping/cart-shoping.component';

@Component({
  selector: 'app-payment-cach',
  templateUrl: './payment-cach.component.html',
  styleUrls: ['./payment-cach.component.scss']
})
export class PaymentCachComponent implements OnInit {

  constructor(private crypt: CryptService,
    private service:CartService,
    private tost:NgToastService,
    private dialog: MatDialog,
    private  orderService:OrderService,
    private dialogclos: MatDialogRef<CartShopingComponent>,private fb :FormBuilder) { }
    userID="";
    payment:Payment=Payment.Cach;  paymentform!:FormGroup;
  ngOnInit(): void {
    this.paymentform=this.fb.group({

      State:['',Validators.required],
      Address:['',Validators.required],
    });

    if (localStorage.getItem('token')) {
      var token = JSON.parse( this.crypt.Decrypt(localStorage.getItem('token')!));
      this.userID = token.id;
    }
  }
Close(){ this.dialogclos.close();}

Payment(){


  this.orderService.CreateOrder(this.userID,this.payment ,this.paymentform.value.Address, this.paymentform.value.State).subscribe(e=>{
    this.tost.success({detail:'Payemnt',summary:e,duration:2000});
    this.service.changeNav(0);
    this.dialog.closeAll();

  },err=>{
    this.tost.warning({detail:'Payemnt',summary:err.error,duration:2000});
  })
}

}
