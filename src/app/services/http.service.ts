import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';//some servers require require extra headers for save operations. 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/'

  constructor(private http: HttpClient) { }

  

  getDataService(url) {
    url=this.url+url
    return   this.http.get(url);
        }
       

  addDataService(url,body){

    url=this.url+url;
    
    return this.http.post(url,body);

  }
     
  getAddService(url) {
    url=this.url+url
    return   this.http.get(url);
        }
       

}

