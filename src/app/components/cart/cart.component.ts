import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { CartserviceService } from '../../core/services/cartService/cartservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  
})
export class CartComponent implements OnInit {
  
  constructor(public user:UserService,public cartservice:CartserviceService) {}

  ngOnInit() {
  this.getCartDetails();
  }
  public content;
  public name;
  public price;
  public desc;
  public product=localStorage.getItem('productId');
public productId;
getCartDetails(){
this.cartservice.cartDetails(this.product).subscribe(response=>{
console.log('cartDetails',response);
this.productId=response['data']['product']['id']
this.name=response['data']['product']['name']
this.price=response['data']['product']['price']
this.desc=response['data']['product']['description']
console.log(this.productId);
});

}
  
}
