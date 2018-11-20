
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import{environment} from '../../../../environments/environment'
import  {HttpService} from '../http/http.service'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token=localStorage.getItem('token');

  constructor(private http: HttpClient,
              private service :HttpService) { }
  url = environment.baseUrl;

  postLogout() {
    let url = this.url + "user/logout";
    return this.service.httpPost(url, {});
  }
  getDataServiceBasicAdvance()
  {
     let url = this.url + "user/service";
    return this.http.get(url);
  }
  getAddService()
  {
     let url = this.url + "user";
    return this.http.get(url);
  }
  postSignUp( body) {
    let url = this.url + "user/userSignUp";
    return this.http.post(url, body);
  }
  postLogin(body){
    let url = this.url +"user/login";
    return this.http.post(url, body);
  }
  postReset(body){
    let url = this.url +"user/reset";
    return this.http.post(url, body);

  }

  }