
import { Injectable, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '@app/_interfaces/IUser';
import { AppEnv } from '@app/_helpers/appenv'



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
    
    constructor(   private router: Router, 
        private http: HttpClient ,
        private env: AppEnv ) 
        {  }


        private AUTH_API = this.env.API_URL
        
        public get isLoggedIn() {
            return (localStorage.getItem("access") != null);
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
    

    public clockOvertime() {
        if (this.tokenConvert(localStorage.getItem("refresh")).ttl > 60000) 
            if ( this.tokenConvert(localStorage.getItem("access")).ttl < 60000)  {
                this.refreshToken().subscribe()
        }

    }



    public tokenInfo() {
        return this.tokenConvert(localStorage.access)
    }

    login(usr:any): Observable<any> {
        return this.http.post<any>(`${this.AUTH_API}/api/token/`, usr,httpOptions)
        .pipe(map(token => {
                localStorage.setItem('refresh',token.refresh)
                localStorage.setItem('access',token.access)
                console.log(localStorage)
                this.startRefreshTokenTimer();
           }));
    }

    logout() {
        this.stopRefreshTokenTimer();
        localStorage.removeItem("refresh")
        localStorage.removeItem("access")
        this.router.navigate(['login']);
    }



    refreshToken() : Observable<any> {
        return this.http.post<any>(`${this.AUTH_API}/api/token/refresh/`, { refresh: localStorage.getItem("refresh") },httpOptions)
            .pipe(map((token) => {
                localStorage.setItem('access',token.access);
                this.startRefreshTokenTimer();
            }));
    }



    // helper methods

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(localStorage.getItem("access").split('.')[1]));
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
        return this.http.post<any>(`${this.AUTH_API}/register/` , user,httpOptions);
      }

}