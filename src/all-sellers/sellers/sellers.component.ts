import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { iSellers } from 'src/interface/iSellers';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  constructor(
    private crypt: CryptService,
    private UserS: UserService,
    private rout: Router
  ) {}
  AllSellers: any;
  errMsg: any;

  gotoProductDetails(ID: string) {
    console.log(ID);
    this.rout.navigate(['/Sellers/Produts/', ID]);
  }

  ngOnInit(): void {
    this.UserS.getAllSellers().subscribe(
      (data: iSellers[]) => {
        this.AllSellers = data;
      },
      (err: string) => {
        this.errMsg = err;
      }
    );
  }
}
