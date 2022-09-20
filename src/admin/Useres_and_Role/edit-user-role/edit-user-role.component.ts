import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EditRoleModel } from 'src/@electronic/model/editrole';
import { RolesAllModel } from 'src/@electronic/model/rolesall';
import { AdminService } from 'src/@electronic/services/admin.service';

@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.scss']
})
export class EditUserRoleComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private service: AdminService,
    private rout:Router,private tost:NgToastService
  ) {}
  public messageValidate = {
    rolename: { required: 'Name Role required' },
  };
  userId!: string;
  username!: string;
  roleId!: string;
  userform!: FormGroup;
  allroles!: RolesAllModel[];
  EditRole!: EditRoleModel;
  ngOnInit(): void {
    this.EditRole = {
      userId: '',
      roleId: '',
    };
    this.userId = '';
    this.username = '';
    this.roleId = '';
    this.userform = this.fb.group({
      rolename: ['', Validators.required],
      username: [''],
    });
    this.activateRoute.paramMap.subscribe((param) => {
      var userId = param.get('userId')!;
      var roleId = param.get('roleId')!;
      if (userId && roleId) {
        this.service.GetUser(userId).subscribe((x) => {

          this.userId = x.id;
          this.username = x.userName;
          this.roleId = roleId;
          this.AddUserData();
        });
        this.service.GetAllRoles().subscribe((x) => {
          this.allroles = x;
        });
      }
    });
  }

  AddUserData() {
    this.userform.setValue({
      username: this.username,
      rolename: this.roleId,
    });
  }

  onRolesChange() {
    this.roleId = this.userform.value.rolename;
  }

  EditRoleuser() {
    if (this.userId && this.roleId &&this.userform.valid) {
      this.EditRole.roleId = this.roleId;
      this.EditRole.userId = this.userId;

      this.service.EditUserRole(this.EditRole).subscribe((x) => {

        this.tost.success({detail:"Edit Role user",summary:"Edited successfully",duration:3000});

      });
    }
  }
}
