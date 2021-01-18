import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
  

const API_URL = 'http://10.0.0.234:8000/users';
const app_URL='http://10.0.0.234:8000/app';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; 
 
@Injectable({
  providedIn: 'root'
})

export class MiscService {
  constructor( private http: HttpClient) { }
    deltaCalc(n:number): Observable<any> {
         return this.http.get(`${app_URL}/calc/${n}`)
    }  



}
