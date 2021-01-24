import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { IUser } from '../_interfaces/IUser';
import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formdata;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService
    ) { }

    result : IUser;
  

    ngOnInit(): void {

      this.formdata = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        email:    new FormControl(''),
      });    
 
  }

  onClickSubmit(data) {
    this.authService.register(data).subscribe(
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
