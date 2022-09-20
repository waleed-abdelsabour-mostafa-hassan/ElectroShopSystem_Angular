import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolesModel } from 'src/@electronic/model/userroles';
import { AdminService } from 'src/@electronic/services/admin.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  constructor(private servies:AdminService,private rout:Router) { }

  UserRoles!:UserRolesModel[];
  ngOnInit(): void {

    this.servies.GetUserRole().subscribe(s=>{
      console.log(s);
      this.UserRoles=s;
    });
  }
  EditRoles(userId:string,roleId:string){
  this.rout.navigate(['admin/dashboard/edituserRole',userId,roleId]);
  }
}
