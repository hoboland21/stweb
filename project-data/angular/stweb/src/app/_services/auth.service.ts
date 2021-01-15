import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuth } from '../_interfaces/IAuth';
import { IUserDB } from '../_interfaces/IUserDB';

const AUTH_API = 'http://10.0.0.234:8000/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {  }


  login(user: IAuth): Observable<any> {
    return this.http.post<IAuth> (AUTH_API + 'auth/', user, httpOptions);
  }

  register(user: IUserDB ): Observable<any> {
    return this.http.post(AUTH_API , user, httpOptions);
  }
}



