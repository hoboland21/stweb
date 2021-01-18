import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppEnv } from '@app/_helpers/appenv'


 
@Injectable({
  providedIn: 'root'
})

export class MiscService {
    constructor( private http: HttpClient, private env: AppEnv) { }

    deltaCalc(n:number): Observable<any> {
         return this.http.get(`${this.env.API_URL}/app/calc/${n}`)
    }  



}
