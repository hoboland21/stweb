
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../_interfaces/IUser';

const AUTH_API = 'http://10.0.0.234:8000';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 


@Injectable({
  providedIn: 'root'
})


/*const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 
 */ 
export class AuthService {
    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<IUser>(null);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(usr:any) {
        return this.http.post<any>(`${AUTH_API}/api/token/`, usr,httpOptions)
            .pipe(map(user => {
                this.userSubject.next(user);              
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    logout() {
    //    this.http.post<any>(`${environment.apiUrl}/users/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    refreshToken(token) {
        return this.http.post<any>(`${AUTH_API}/api/token/refresh/`, token,httpOptions)
            .pipe(map((user) => {
                this.userSubject.next(user);
                this.startRefreshTokenTimer();
                return user;
            }));
    }

    // helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.userValue.access.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    public register(user: IUser ): Observable<any> {
        return this.http.post<any>(`${AUTH_API}/register/` , user,httpOptions);
      }

}