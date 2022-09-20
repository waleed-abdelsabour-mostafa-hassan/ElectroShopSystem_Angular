import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from 'src/@electronic/services/shared.service';
import { IProductImg } from 'src/interface/IProductImg';
import { ProductImgsService } from 'src/Services/product-imgs.service';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  ProductImgs:IProductImg[]=[];
  prodId:any;
  constructor(private router:Router,private ActRoute:ActivatedRoute,
    private _shared:SharedService,private ProdImgsService:ProductImgsService) {
      ActRoute.paramMap.subscribe((params: ParamMap) => {
        this.prodId = params.get('id');
      });
   this.ProdImgsService.getProductImgs(this.prodId).subscribe(data=>{
     this.ProductImgs=data;
   });
     }
     onFileChanged(event:any){
      var go=false;
      for (var i = 0; i < event.target.files.length; i++)
      {
          var form_Obj=new FormData();
          form_Obj.append("image",event.target.files[i]);
          form_Obj.append("productID",this.prodId);
          form_Obj.append("name","New Image");
          this.ProdImgsService.addProductImg(form_Obj).subscribe(data=>{
            console.log(data);
          });
          if(i==event.target.files.length-1)
            {go=true;alert("all Images Uploaded...")}
      }
     if(go) window.location.reload();
     // this.router.navigateByUrl(`/admin/dashboard/ProductImages/${this.prodId}`);
     }
     RemoveImg(event:any){

        this.ProdImgsService.RemoveImage(event.target.id).subscribe(d=>{
         console.log(d);
       }); 
       var f=this.ProductImgs.find(function(e){
        return e.id==event.target.id;
      });
      var index=this.ProductImgs.indexOf(f!);
      this.ProductImgs.splice(index,1);
       
     }
     RemoveAllImages(){
       let confirm=window.confirm("Are You Sure..?")
       if(confirm){
         
         this.ProdImgsService.RemoveAllProductImages(this.prodId).subscribe(d=>{
           console.log(d);
         });
         this.ProductImgs=[];
       }

     }

  ngOnInit(): void {
  }

}
