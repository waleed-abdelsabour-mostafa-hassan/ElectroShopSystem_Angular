import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, Subscriber } from 'rxjs';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})
export class UploadImgComponent implements OnInit {

  constructor( private fb: FormBuilder, private tost: NgToastService,
    private userServece: UserService,
    private crypt: CryptService,private rout:Router,private dialog:MatDialog) { }

  PhotoForm!:FormGroup;
  img!: File;
  urlImage!: string;
  userID!:string;
  ngOnInit(): void {
    this.gettoken();

    this.PhotoForm=this.fb.group(
     {
      photoUser: '',
     }
    );
  }
gettoken(){

  if (localStorage.getItem('token')) {
    var token = JSON.parse(
      this.crypt.Decrypt(localStorage.getItem('token')!)
    );
    this.urlImage = token.img;
    this.userID = token.id;
  }

}

  EditePhoto(){
    if (this.PhotoForm.valid && this.img !== null) {
    const fd = new FormData();
    fd.append('userId', this.userID.toString());
    fd.append('image', this.img);


this.userServece.UploadIMGUser(fd).subscribe(e=>{

const token = JSON.parse(this.crypt.Decrypt(localStorage.getItem('token')!));
     token.img= e;
     localStorage.setItem('token',this.crypt.Encrypt(  JSON.stringify(token)))  ;
     this.gettoken();
this.userServece.changeimg(e);
this.tost.success({detail:'Upload IMG',summary:"Photos successfully modified ",duration:2000});
  this.dialog.closeAll();
});

    }
  }

  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#image').attr('src', e.target!.result!.toString()!);
      };
      reader.readAsDataURL(this.img);
    } else {
      this.img = null!;
      $('#image').attr('src', 'assets/img/No-Image.png');
    }
  }























}
