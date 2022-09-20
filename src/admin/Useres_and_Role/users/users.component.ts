import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/@electronic/model/user';
import { AdminService } from 'src/@electronic/services/admin.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private servise:AdminService,private rout:Router) { }
  users!:Users[];

  num!:number;
  checked!:boolean;
  display = "none";
  id!:any;
  coleor!:boolean;
    ngOnInit(): void {
      this.id='';
      this.coleor=false;
      this.checked=false;
    this.num = 0;
   this.getUsers();
    }
  getUsers() {
    this.servise.GetAllUser().subscribe(list=>{
      this.users=list;
   });
  }

  AddUserNavig(){
    this.rout.navigate(['admin/dashboard/adduser']);
  }
    EditUser(id:string){
      this.rout.navigate(['admin/dashboard/edituser',id]);
    }
    SelectAll() {
      var tbl = $('#tbl');
      var header = tbl.find('thead .ckheader');
      var item = tbl.find('tbody .ckitem');


      $(function () {
        item.on('change', function () {
          if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('NewRowColor').removeClass('bg-light');
          }
          else {
            $(this).closest('tr').removeClass('NewRowColor').addClass('bg-light');
          }
        });

        header.change(function () {

          if ($(this).is(':checked')) {
            item.prop("checked",true);
            item.trigger('check');
            $(item).closest('tr').addClass('NewRowColor').removeClass('bg-light');
          }
          else {
            item.prop("checked",false);
            item.trigger('check');
            $(item).closest('tr').removeClass('NewRowColor').addClass('bg-light');
          }
        });
      });


    }
    ItemChecked(ch:any){
      console.log(ch);
      if($(ch)[0].target.checked){
        $($(ch)[0].path[2]).addClass('NewRowColor').removeClass('bg-light');
          }else{
            $($(ch)[0].path[2]).removeClass('NewRowColor').addClass('bg-light');

      }

    }
    DeleteConfirm(){
      var checkboxes = document.getElementsByClassName('ckitem');
      if (checkboxes.length > 0) {
        const ids : string[] = [];
        for (let i = 0; i < checkboxes.length; i++) {
          if ($(checkboxes[i]).is(":checked")) {
           this.id = $(checkboxes[i]).val();
            ids.push(this.id);
          }
        }
        console.log(ids);
        this.servise.DeleteAll(ids).subscribe(s=>{
          this.getUsers();
         this.onCloseHandled();
        }, ex=>{ console.log(ex)});
      }

    }

    IsDelete(){
      var checkboxes =document.getElementsByClassName('ckitem');
      if (checkboxes.length >0){
         for (let i = 0; i < checkboxes.length; i++) {
           if($(checkboxes[i]).is(":checked")){

            return true;
           }
         }
           }
return false;
    }
    DeleteCount(){
      this.display = "block";
      var count =$(".ckitem:checked").length;
      this.num=count;

    }


    onCloseHandled() {
      this.display = "none";
    }
  }
