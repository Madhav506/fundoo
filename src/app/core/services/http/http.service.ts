import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  url=environment.baseUrl;
  profileUrlNew=environment.profileUrl;

  constructor(private http: HttpClient) { }

public httpPost(url,body){
  // var  token = localStorage.getItem('token');

  var httpAuthOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': token
    })
  };
  /**passing the input & calling the  getFormUrlEncoded()*/
  return this.http.post(url, body, httpAuthOptions2);
}

public httpget(url){
  var httpAuthOptions3 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })

  };
  return this.http.get(url, httpAuthOptions3);

}

public httppostpassword(url,body){

let httpAuthOptions1 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};
return this.http.post(url, this.getFormUrlEncoded(body),httpAuthOptions1)/**passing the input & calling the  getFormUrlEncoded()*/
}
getFormUrlEncoded(toConvert) {
  const formBody = [];
  for (const property in toConvert) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(toConvert[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}
public httpImage(url,body){
  var  token = localStorage.getItem('token');
var http={
  headers:new HttpHeaders({
   
   'Authorization':token
  })
};
return this.http.post(url,body,http)
}

postpassword(input,access_token) {
  console.log(access_token);
    let url = this.url + "user/reset-password"
  var httpAuthOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': access_token
    })

  };
  return this.http.post(url, this.getFormUrlEncoded(input), httpAuthOptions1);

}
}


  