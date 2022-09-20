import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Users } from 'src/@electronic/model/user';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public date:any,private userservice:UserService,private dialog:MatDialog,private dialogref:MatDialogRef<OrderUserComponent>) { }


User!:Users;

  ngOnInit(): void {
    console.log(this.date)
    this.userservice.GetUser(this.date).subscribe(e=>{
      console.log(e)
      this.User=e;
    })
  }

  Close(){
    this.dialogref.close();
  }
}
