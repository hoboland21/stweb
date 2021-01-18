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
 
  constructor(private authService: AuthService,
    private miscService: MiscService,
    private userService: UserService) { }

  tokenInfo;
  deltaT : {};
  user;

 ngOnInit(): void {
    
  this.tokenInfo = this.authService.tokenInfo()
  this.userGet()
    
  }

  
  userGet() {
    let u = this.tokenInfo.user_id
    this.userService.getUserRec(u).subscribe(
      (data) => this.user=data
    )
  }


  rescan() : void {
    this.tokenInfo = this.authService.tokenInfo();
    this.calcDelta();
    
  }

  calcDelta() {
    let t = this.tokenInfo.ttl
    this.miscService.deltaCalc(t).subscribe(
      (data) => this.deltaT=data
    )
  }
}