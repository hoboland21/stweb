import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

import {  FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata;
  errorMessage;
  time;
  usr;
  token;
  isLoggedIn;
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    
    this.formdata = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')

    });
  }




  
  onClickSubmit(data) {
    localStorage.clear()
    this.authService.login(data).subscribe(
      (data) => console.log("Submit Data",data)
    )
 
  }

  checkList() {
    console.log("Looking at User",this.authService.tokenValue)

    this.userService.getList().subscribe(
      (data) => console.log("Check List",data.refresh) 
    )
  }


refreshToken() {
  this.authService.refreshToken()
  .subscribe(
    (data) => { console.log(data)
    }
  )
}

  reloadPage(): void {
    window.location.reload();
  }

  
}
