import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { CartProduct } from 'src/@electronic/model/CartProduct';
import { Payment } from 'src/@electronic/model/payment';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { OrderService } from 'src/@electronic/services/order.service';

@Component({
  selector: 'app-payment-online',
  templateUrl: './payment-online.component.html',
  styleUrls: ['./payment-online.component.scss']
})
export class PaymentOnlineComponent implements OnInit {

  constructor(private crypt: CryptService,
    private service:CartService,
    private tost:NgToastService,
    private orderService:OrderService,private dialogcloseAll:MatDialog,
    private dialog:MatDialogRef<PaymentOnlineComponent>,private fb :FormBuilder) { }
  cartproducts!:CartProduct[];
  items:number=0;
  totalprize:number=0;
  userID="";
  paymentform!:FormGroup;

  payment:Payment=Payment.Credit_Card;
  ngOnInit(): void {
    this.paymentform=this.fb.group({
      CardNumber :['',Validators.required],
      CardHolder:['',Validators.required],
      Expires:['',Validators.required],
      CVC:['',Validators.required],
      State:['',Validators.required],
      Address:['',Validators.required],
    });

    if (localStorage.getItem('token')) {
      var token = JSON.parse( this.crypt.Decrypt(localStorage.getItem('token')!));
      this.userID = token.id;
    }
    this.cartsGetAll();
  }
  cartsGetAll(){
    this.service.GetAll( this.userID).subscribe(e=>{

      this.cartproducts=e;
      this.totalprize=0;
      e.forEach((r) => {
      this.totalprize += r.price
      });
    });}


    Close(){
      this.dialog.close();

    }
    Payment(){
      this.orderService.CreateOrder(this.userID,this.payment,  this.paymentform.value.Address, this.paymentform.value.State).subscribe(e=>{
        this.tost.success({detail:'Payemnt',summary:e,duration:2000});
        this.paymentform.reset();
        this.service.changeNav(0);
        this.dialogcloseAll.closeAll();
      },err=>{
        this.tost.warning({detail:'Payemnt',summary:err.error,duration:2000});
      })


    }
}
