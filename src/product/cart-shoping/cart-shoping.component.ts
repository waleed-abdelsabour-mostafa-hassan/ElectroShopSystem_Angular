import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { CartProduct } from 'src/@electronic/model/CartProduct';
import { CartService } from 'src/@electronic/services/cart.service';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { OrderService } from 'src/@electronic/services/order.service';
import { PaymentCachComponent } from '../payment-cach/payment-cach.component';
import { PaymentOnlineComponent } from '../payment-online/payment-online.component';

@Component({
  selector: 'app-cart-shoping',
  templateUrl: './cart-shoping.component.html',
  styleUrls: ['./cart-shoping.component.scss']
})
export class CartShopingComponent implements OnInit {

  constructor(private crypt: CryptService,
    private service:CartService,
    private tost:NgToastService,
    private dialog: MatDialog,
    private  orderService:OrderService,
    private dialogclos: MatDialogRef<CartShopingComponent>
   ) { }
  cartproducts!:CartProduct[];
  items:number=0;
  totalprize:number=0;
  userID="";
 ngOnInit(): void {

  if (localStorage.getItem('token')) {
    var token = JSON.parse( this.crypt.Decrypt(localStorage.getItem('token')!));
    this.userID = token.id;
  }



   this.cartsGetAll();
   this.countitemcard();


 }


 changeNumberProduct( idprodect:number,  pluscount:string){


let pluscount2= parseInt(pluscount);
 this.service.AddCountProduct(idprodect,pluscount2, this.userID).subscribe(e=>{
   this.cartsGetAll();
 })
}


cartsGetAll(){
   this.service.GetAll( this.userID).subscribe(e=>{
    console.log(e);
     this.cartproducts=e;
     this.totalprize=0;
     e.forEach((r) => {
     this.totalprize += r.price
     });
   });}

 deletproductcart(idproduct:number){
   this.service.DeleteCartProduct(idproduct, this.userID).subscribe(g=>{
     this.countitemcard();
   this.cartsGetAll();
     this.tost.success({detail:"Shopping Cart",summary:g,duration:2000});
    },err=>{
     console.log(err);
     this.cartsGetAll();
     this.tost.warning({detail:"Shopping Cart",summary:err,duration:2000});
    })
 }


 Close(){
  this.dialogclos.close();
 }
countitemcard(){
 this.service.CountCart( this.userID).subscribe(e=>{
   this.service.changeNav(e);
   this.items=e;
     });
}

BuyOrder(sselectva:string){
  if(this.totalprize<=0){
this.tost.info({detail:'Shopping Cart',summary:'Please Add Product In Cart',duration:4000});
  }else{
if(sselectva=='1'){

  const dialogRef = this.dialog.open(PaymentOnlineComponent, {
    width:'100%'
 // data: {name: this.name, animal: this.animal},
});
dialogRef.afterClosed().subscribe((result) => {
  console.log('The dialog was closed');
  // this.animal = result;
});

}else{


  const dialogRef = this.dialog.open(PaymentCachComponent, {
    width:'50%',height:'40%'
 // data: {name: this.name, animal: this.animal},
});
dialogRef.afterClosed().subscribe((result) => {
  console.log('The dialog was closed');
  // this.animal = result;
});







}
}

}

}


