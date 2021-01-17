import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

import {  FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
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
    this.authService.login(data)
    .pipe(first())
    .subscribe({
      next: () => {
        console.log("In the next box")
      },
      error: error => console.log(error)
    })
  }

  checkList() {
    console.log("Looking at User",this.authService.userValue.refresh)

    this.userService.getList().subscribe(
      (data) => console.log(data.refresh) 
    )
  }


refreshToken() {
  console.log(this.authService.userValue.refresh)
  this.authService.refreshToken(this.authService.userValue)
  .subscribe(
    (data) => { console.log(data)
    console.log(this.authService.userValue)
    }
  )
}

  reloadPage(): void {
    window.location.reload();
  }

  
}
