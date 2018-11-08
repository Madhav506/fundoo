import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  url = 'http://34.213.106.173/api/'

  constructor(private http: HttpClient) { }


  // getDataService  to get data from service api

  getDataService(url) {
    url = this.url + url
    return this.http.get(url);
  }

  //addDataService to post the data to server
  addDataService(url, body) {

    url = this.url + url;

    return this.http.post(url, body);

  }
  //to retrieve data  stored in server
  getAddService(url) {
    url = this.url + url
    return this.http.get(url);
  }

  postpassword(url, input, token) {
    // console.log(token);
    // console.log(input);

    url = this.url + url;
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })

    };


    return this.http.post(url, this.getFormUrlEncoded(input), httpAuthOptions1);

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
//post api for logout

postLogout(url,token){
  // console.log("token to logout",token);
  url = this.url + url;
  var option = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  
  };
  // post should send 3 parameters. Url, body and then headers.
  return this.http.post(url,{}, option);

}
getCardData(url,token){
  // console.log("token while getnotes list",token);
  url = this.url + url;
  var option1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  
  };
  return this.http.get(url,option1);
}

postDelete(url,body,token){
  // console.log(" service")
    url=this.url+url;
    var option2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    
    };
    return this.http.post(url,body,option2);

  }
  deleteData(url){
    url=this.url+url;
    return this.http.delete(url);

  }
  addImage(url,body,token){
    // console.log(token);
    var http={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.post(this.url+"/"+url,body,http)
  }
  
  
}


