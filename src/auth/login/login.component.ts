import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidators } from 'src/@electronic/CustomValidators/ConfirmPasswordValidator';
import { CryptService } from 'src/@electronic/services/crypt.service';
import { UserLogin } from 'src/interface/IUserLogin';
import { UserRegisteration } from 'src/interface/IUserRegisteration';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//login
log!:UserLogin;
logform:any;

//register
reg!:UserRegisteration;
UserForm:any;

constructor( private crypt:CryptService ,private elementRef:ElementRef,private fb: FormBuilder, public dialog: MatDialog,
 private router:Router,private service:UserService,  private tost: NgToastService) { }

 formOptions: AbstractControlOptions = { validators: ConfirmPasswordValidators };
ngOnInit(): void {
 //login
 this.log={
   Email:'',
   Password:''
 };
 this.logform=this.fb.group({
   email:['',Validators.required],
   password:['',Validators.required],

 });

  //register
 this.reg={
   UserName:'',
   Email:'',
   Password:'',
   ConfirmPassword:'',
   Address:'',
   Phone:'',
   Image:'',
   RoleName:'',
 };

 this.UserForm=this.fb.group({
 userName:['',[Validators.required,Validators.pattern("^[A-Z][a-z][A-Za-z]*$")]],
 email:['',[Validators.required,Validators.pattern("[a-z0-9]+@[a-z]+\.[a-z]{2,3}")]],
 password:['',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{8,}$')]],
 confirmPassword:[''],
 address:['',Validators.required],
 phone:['',Validators.required],
 image:[''],
 rolename:['']
},this.formOptions);
}
ngAfterViewInit() {

  const sign_in_btn = this.elementRef.nativeElement.querySelector("#sign-in-btn") .addEventListener('click',()=>{ container.classList.remove("sign-up-mode");});
  const sign_up_btn = this.elementRef.nativeElement.querySelector("#sign-up-btn").addEventListener('click',()=>{ container.classList.add("sign-up-mode");});
  const  container =this.elementRef.nativeElement.querySelector(".container");

}
//login
get Email()
{
return this.logform.get('email')
}
get Password()
{
return this.logform.get('password')
}

//register
get UserName()
{
return this.UserForm.get('userName')
}
get Email2()
{
return this.UserForm.get('email')
}
get Password2()
{
return this.UserForm.get('password')
}
get Address()
{
return this.UserForm.get('address')
}
get Phone()
{
return this.UserForm.get('phone')
}
get Image()
{
return this.UserForm.get('image')
}

//login
login()
{
if(this.logform.valid)
{
 this.ValidateLoginModel();
 this.service.Login(this.log).subscribe({
   next:(v:any) =>{

    localStorage.setItem('token',this.crypt.Encrypt(  JSON.stringify(v)))  ;
    this.service.changeNav(true);
    this.tost.success({detail:"Login",summary:`Welcome ${v.nameUser}`,duration:3000});
     this.service.loggedIn=true;
     //console.log(localStorage.getItem('token'));
     this.logform.reset();
     this.router.navigate(['/home']);
     const dialogRef = this.dialog.closeAll();
   },
   error:(x)=>{console.log(x) ;
       this.tost.warning({detail:"Login",summary:"InCorrect In Email or Password",duration:3000});
  }

});

}
}
ValidateLoginModel()
{
this.log.Email=this.logform.value.email;
this.log.Password=this.logform.value.password;

}

//register
register()
{
  if(this.UserForm.valid)
  {
    this.ValidateRegisterModel();

    this.service.Register(this.reg).subscribe(
     v =>{
      const dialogRef = this.dialog.closeAll();

      this.tost.success({detail:"Login",summary:v,duration:3000});

      this.UserForm.reset();
        this.service.loggedIn=true;
        this.dialog.open(LoginComponent, {
          width: '100%',
        });
       // this.ngOnInit();
      },err=>{
        this.tost.warning({detail:"Login",summary:err.error,duration:5000});

      }
      );

  }
}

ValidateRegisterModel()
{
this.reg.UserName=this.UserForm.value.userName;
this.reg.Email=this.UserForm.value.email;
this.reg.Password=this.UserForm.value.password;
this.reg.ConfirmPassword=this.UserForm.value.confirmPassword;
this.reg.Address=this.UserForm.value.address;
this.reg.Phone=this.UserForm.value.phone;
this.reg.Image="No-Image.png";

}
changeRole(e:any) {
  //debugger;
  this.reg.RoleName=e.target.value;
  //this.UserForm.value.rolename=e.target.value;
  //console.log(e.target.value);
}
}
