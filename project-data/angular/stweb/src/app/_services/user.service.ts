import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@app/_interfaces/IUser'  

const API_URL = 'http://10.0.0.234:8000/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor( private http: HttpClient) { }
  
  getUserRec(id:number): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/${id}`)
  }
}