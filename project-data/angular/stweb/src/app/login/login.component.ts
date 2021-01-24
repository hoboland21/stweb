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

  onSubmit(data) {
    localStorage.clear()
    this.authService.login(data).subscribe(
      (data) => {
        this.router.navigate(['home']);
      
      }
    )
 
  }


  
}
