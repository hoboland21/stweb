import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService : AuthService) { }
  subscription : Subscription;
  isLoggedIn: boolean;

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe(
      token => this.isLoggedIn = token
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout()
  }
}
