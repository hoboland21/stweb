import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { IUser } from '../_interfaces/IUser'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  tokenTTL;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  
  }
}
