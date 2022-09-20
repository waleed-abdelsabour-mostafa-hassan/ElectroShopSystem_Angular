import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Product } from 'src/@electronic/model/Product';
import { AdminService } from 'src/@electronic/services/admin.service';

@Component({
  selector: 'app-productsapprove',
  templateUrl: './productsapprove.component.html',
  styleUrls: ['./productsapprove.component.scss']
})
export class ProductsapproveComponent implements OnInit {
  products:Product[]=[];
  constructor(private servise:AdminService,private rout:Router) { }

  ngOnInit(): void {

    this.getAllProductsToApprove();

  }

  getAllProductsToApprove() {
    this.servise.GetAllProducts().subscribe(list=>{
      this.products=list;
      //console.log(this.products);
   });
}

DeleteProduct(id:number,event:any){
  var confirm=window.confirm("Are You Want To Delete This Product !!!");
  if(confirm)
  {
    this.servise.RemoveProduct(id).subscribe(data=>{
      this.getAllProductsToApprove();

    });
    event.target.parentElement.parentElement.remove();
  }
}
ChangeProductApprove(id:number,approve:boolean=true)
{
  this.servise.ChangeProductApprove(id,approve).subscribe(data=>{
    this.getAllProductsToApprove();
  });
}


gotoProductDetails = (ID: Number) => {
  this.rout.navigate(['/product/details/', ID]);
};
}
