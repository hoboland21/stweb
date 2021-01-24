import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { MiscService } from '@app/_services/misc.service';
import { UserService } from '@app/_services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  constructor() {}
  
  
  ngOnInit(): void {
    
  }

}

