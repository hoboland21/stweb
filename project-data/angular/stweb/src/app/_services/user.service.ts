import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
  

const API_URL = 'http://10.0.0.234:8000/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor( private http: HttpClient) { }
  
  

}
