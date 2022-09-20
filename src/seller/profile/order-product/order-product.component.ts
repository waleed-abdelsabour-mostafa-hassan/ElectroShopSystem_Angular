import { Component, OnInit } from '@angular/core';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { OrderProductForSeller } from 'src/interface/OrderProductForSeller';
import { OrderProductService } from 'src/Services/order-product.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
})
export class OrderProductComponent implements OnInit {
  pages!: number;
  itemsPerPage = 5;
  curr: number = 1;
  totalitems: number = 0;
  AllOrderProduct: any;
  errMsg: any;
  SellerId: any;
  i = 0;
  constructor(
    private OrderProductS: OrderProductService,
    private crypt: CryptService
  ) {}
  ChangeActivityStatus(orderId: number, Approve: string) {
    this.OrderProductS.ApproveOrder(orderId, Approve).subscribe();
    location.reload();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = JSON.parse(
        this.crypt.Decrypt(localStorage.getItem('token')!)
      );
      this.SellerId = token.id;
    }
    this.OrderProductS.GetAllOrderProductBySellerID(this.SellerId).subscribe(
      (data: OrderProductForSeller[]) => {
        this.AllOrderProduct = data;
        console.log(data);
        this.totalitems = data.length;
      },
      (err: string) => {
        this.errMsg = err;
      }
    );
  }
}
