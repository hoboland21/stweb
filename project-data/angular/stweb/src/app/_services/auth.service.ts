
import { Injectable, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '@app/_interfaces/IUser';
import { IToken } from '@app/_interfaces/IToken';
 

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
    private tokenSubject: BehaviorSubject<IToken>;
    public token: Observable<IToken>;
    
    constructor(   private router: Router, 
        private http: HttpClient  ) 
        {
            this.tokenSubject = new BehaviorSubject<IToken>(null);
            this.token = this.tokenSubject.asObservable();
        }

    public get tokenValue(): IToken {
        return this.tokenSubject.value;
    }

    public tokenConvert(token) {
        let result = {}
        // decode the token to read the username and expiration timestamp
        let token_parts = token.split(/\./);
        let token_decoded = JSON.parse(window.atob(token_parts[1]));
        token_decoded.exp = token_decoded.exp * 1000
        token_decoded.ttl = token_decoded.exp - Date.now()
        
        return token_decoded
    }
    
    public tokenInfo() {
        return this.tokenConvert(this.tokenValue.access)
    }
    login(usr:any) {
        return this.http.post<any>(`${AUTH_API}/api/token/`, usr,httpOptions)
        .pipe(map(token => {
                localStorage.setItem('refresh',token.refresh)
                this.tokenSubject.next(token);              
                this.startRefreshTokenTimer();
                return token;
            }));
    }

    logout() {
        this.stopRefreshTokenTimer();
        this.tokenSubject.next(null);
        this.router.navigate(['login']);
    }

    refreshToken() {
        return this.http.post<any>(`${AUTH_API}/api/token/refresh/`, { refresh: localStorage.refresh },httpOptions)
            .pipe(map((token) => {
                this.tokenSubject.next(token);
                this.startRefreshTokenTimer();
                return token;
            }));
    }

    // helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.tokenValue.access.split('.')[1]));
        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => { 
            this.refreshToken().subscribe()
        }, timeout);
    }
    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
    public register(user: IUser ): Observable<any> {
        return this.http.post<any>(`${AUTH_API}/register/` , user,httpOptions);
      }

}