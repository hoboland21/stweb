import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { IAuth } from '../_interfaces/IAuth';
import {  FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata;
  fdata;
  form: IAuth;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  group = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.group = this.tokenStorage.getUser().group;
    }
  
    this.formdata = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')

    });
  }

  onClickSubmit(data) {
    console.log(data)
  
    this.authService.login(data).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.group = this.tokenStorage.getUser().group;
        
        console.log(data)
        //this.reloadPage();
                
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
  onSubmit(): void {
 

  }
}
