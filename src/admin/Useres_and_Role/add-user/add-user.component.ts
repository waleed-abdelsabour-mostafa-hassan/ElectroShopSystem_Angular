import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditUserModel } from 'src/@electronic/model/EditUserModel';
import { Users } from 'src/@electronic/model/user';
import { UserModel } from 'src/@electronic/model/usermodel';
import { AdminService } from 'src/@electronic/services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor( private fb: FormBuilder,
    private service: AdminService, private activateRoute: ActivatedRoute) { }
  message!: string;
  errorMsg!: string;
  userForm!: FormGroup;
  regex!: RegExp;
  isbusy!: boolean;
  title!: string;
  btnTitle!: string;
  isEditMode!: boolean;
  users!: Users[];
  id!: string;
  user!: UserModel;
  userData!: Users;
  editUserData!: EditUserModel;
  messageValidate = {
    userName: {
      required: 'username is required',
      matchUserName: 'The username is in use',
    },
    email: {
      required: 'email is required',
      notValid: 'Invalid email entered',
      matchEmail: 'The email is in use',
    },
    pass: {
      required: 'password is required',
      minLength: 'The minimum password is 6 characters',
      notMatch: 'Password must contain a number - uppercase letter - lowercase letter - uppercase letter',
    },
    passConfirm: {
      required: 'confirm password is required',
      minLength: 'The minimum password is 6 characters',
      isMatch: 'Passwords do not match'
    },
  };
  ngOnInit(): void {
    this.id = '';
    this.isbusy = false;
    this.users ==null;
    this.message = '';
    this.errorMsg == null;
    this.title = 'Add User New';
    this.btnTitle = 'Add User';
    this.userData == null;
    this.isEditMode = false;
    this.user = {
      userName: '',
      email: '',
      password: '',
      emailConfirmed: false,
      phoneNumber: '',
      address: ''
    };
    this.editUserData = {
      id: '',
      userName: '',
      email: '',
      emailConfirmed: false,
      password: '',
      phoneNumber: '',
      address: '',
    }
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      emailConfirmed: false,
      address: '',
      phone: ''
    });

    this.userForm.valueChanges.subscribe(x => {
      if (this.userForm.status == 'VALID') {
        this.isbusy = true;
      }
    }, ex => console.log(ex));

    this.GetAllUsers();

    this.activateRoute.paramMap.subscribe(param=>{
     var id= param.get('id')!;
     if(id){
       this.service.GetUser(id).subscribe(x=>{
console.log(x);
       this.userData=x;
      this.title = ' Edit User Data ';
      this.btnTitle = 'Edit & Save';
      this.isEditMode = true;
      this.AddUserData();
      this.id=id;
       })

     }
    })


  }
  AddUserData() {
    if (this.userData !== null) {
 this.userForm.setValue({
  userName: this.userData.userName,
  email:this.userData.email,
  password: this.userData.passwordHash,
  passwordConfirm:this.userData.passwordHash,
  emailConfirmed: this.userData.emailConfirmed,
  address: this.userData.address,
  phone: this.userData.phoneNumber,

 });

    }
  }

  AddUser(){
    if (this.userForm.valid) {
if(!this.isEditMode){
      this.user.address = this.userForm.value.address;
      this.user.emailConfirmed = this.userForm.value.emailConfirmed;
      this.user.phoneNumber = this.userForm.value.phone;
      this.user.password = this.userForm.value.password;
      this.user.userName = this.userForm.value.userName;
      this.user.email = this.userForm.value.email;

      this.service.AddUser(this.user).subscribe(x=>{

        this.ngOnInit();
        this.message = 'The new user has been added successfully';
      },ex => this.errorMsg = ex)
    }else{
      this.editUserData.id = this.id;
      this.editUserData.email = this.userForm.value.email;
      this.editUserData.emailConfirmed = this.userForm.value.emailConfirmed;
      this.editUserData.password = this.userForm.value.password;
      this.editUserData.address = this.userForm.value.address!;
      this.editUserData.phoneNumber = this.userForm.value.phone!;
      this.editUserData.userName = this.userForm.value.userName;
      this.service.EditUser(this.editUserData).subscribe(x=>{
        this.message = 'The data has been Edit successfully';
      }, ex => console.log(ex));
    }
    }

  }

  isUserNameExist() {
    var name = this.userForm.value.userName;
    if (name !== null && name !== '') {
      for (const user of this.users.values()!) {
        if (user.userName === name && !this.isEditMode) {
          return true;
        }
        else if (this.isEditMode && user.userName === name && user.id !== this.userData.id) {
          return true;
        }
      }
    }
    return false;
  }

  isEmailExist() {
    var email = this.userForm.value.email;
    if (email !== null && email !== '') {
      for (const item of this.users.values()) {
        if (item.email === email && !this.isEditMode) {
          return true;
        }
        else if (this.isEditMode && item.email === email && item.id !== this.userData.id) {
          return true;
        }
      }
    }
    return false;
  }

  isPasswordValid() {
    const pass = this.userForm.value.password;
    if (pass !== '' && pass.length > 5) {
      this.regex = new RegExp('[a-z]');
      if (!this.regex.test(pass)&&!this.isEditMode) {
        this.messageValidate.pass.notMatch = 'The password must contain at least a lowercase letter';
        return false;
      } else if(this.isEditMode&&!this.regex.test(pass)&&pass!==this.userData.passwordHash){
        this.messageValidate.pass.notMatch = 'The password must contain at least a lowercase letter';
        return false}
      this.regex = new RegExp('[A-Z]');
      if (!this.regex.test(pass)&&!this.isEditMode) {
        this.messageValidate.pass.notMatch = 'Password must contain at least an uppercase character';
        return false;
      } else if(this.isEditMode&&!this.regex.test(pass)&&pass!==this.userData.passwordHash){
        this.messageValidate.pass.notMatch = 'Password must contain at least an uppercase character';
        return false}
      this.regex = new RegExp('[~!@#$%^&*()+<>{}]');
      if (!this.regex.test(pass)&&!this.isEditMode) {
        this.messageValidate.pass.notMatch = 'Password must contain at least one distinguished character';
        return false;
      } else if(this.isEditMode&&!this.regex.test(pass)&&pass!==this.userData.passwordHash){
        this.messageValidate.pass.notMatch = 'Password must contain at least one distinguished character';
        return false}
      this.regex = new RegExp('[0-9]');
      if (!this.regex.test(pass)&&!this.isEditMode) {
        this.messageValidate.pass.notMatch = 'Password must contain at least one number';
        return false;
      } else if(this.isEditMode&&!this.regex.test(pass)&&pass!==this.userData.passwordHash){
        this.messageValidate.pass.notMatch = 'Password must contain at least one number';
        return false}
  }
    return true;
  }

  isPasswordMatch() {
    if (this.userForm.value.password !== '' && this.userForm.value.passwordConfirm !== '') {
      if ((this.userForm.value.password !== this.userForm.value.passwordConfirm) &&
        this.userForm.value.password.length > 5 && this.userForm.value.passwordConfirm.length > 5) {
        return true;
      }
    }
    return false;
  }

  GetAllUsers() {
    this.service.GetAllUser().subscribe((list) => {
      this.users = list;
    }, ex => console.log(ex));
  }
}
