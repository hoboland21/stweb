import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { IUserDB } from '../_interfaces/IUserDB';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

    userForm : FormGroup;
    result : IUserDB;
  

    ngOnInit(): void {
    this.userForm = this.formBuilder.group ({
      fullname: '',
      username:  '',
      password: '',
      email: '',
      group: '',
    });
  
  
  }

  onSubmit(): void {

    this.authService.register(this.result).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
