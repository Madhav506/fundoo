import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor( public service: HttpService) { }
  url = environment.baseUrl;

  addToCart(body) {
    let url = this.url + "/productcarts/addToCart";
    return this.service.httpPost(url, body);
  }

  cartDetails(cartId) {
    let url = this.url + "/productcarts/getCartDetails/"+cartId;
    return this.service.httpget(url);
  }
  placeOrder(body) {
    let url = this.url +"productcarts/placeOrder"    ;
    return this.service.httpPost(url, body);
  }
}
