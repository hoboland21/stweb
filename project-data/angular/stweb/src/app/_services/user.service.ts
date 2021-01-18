import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@app/_interfaces/IUser'  
import { AppEnv } from '@app/_helpers/appenv'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor( 
    private http: HttpClient,
    private env:AppEnv
    ) { }
  
  getUserRec(id:number): Observable<IUser> {
    return this.http.get<IUser>(`${this.env.API_URL}/users/${id}`)
  }
}