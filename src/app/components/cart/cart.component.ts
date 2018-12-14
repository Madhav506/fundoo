import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { CartserviceService } from '../../core/services/cartService/cartservice.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  
})
export class CartComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
 
  public value = 25;

 public  open=false;
 public show=false;
 public signin=true;
 check=true;
 public cssSign;
  constructor(public user:UserService,public cartservice:CartserviceService,public snackBar:MatSnackBar) {}

  ngOnInit() {
  this.getCartDetails();
  }

  public body;
  public content;
  public name;
  public price;
  public desc;
  public product=localStorage.getItem('productId');
  /**
   * getCartDetails method to get all the cart details
   */
public productId;
getCartDetails(){
this.cartservice.cartDetails(this.product)
.pipe(takeUntil(this.destroy$))
.subscribe(response=>{
this.productId=response['data']['product']['id']
this.name=response['data']['product']['name']
this.price=response['data']['product']['price']
this.desc=response['data']['product']['description']
});

}
/**
   * Proceeding to checkout from the cart section
   */
proceedToCheckOut(){
  this.open=true;
  this.value=54;
  this.cssSign=true;
  this.signin=false;
}
refresh(){
  location.reload();
}
/**
 * Placing the order for a product 
 *    */
placeOrder(address){
  if(address!=undefined){
  this.body=
  {
    "cartId":this.product,
    "address":address
  }
              this.cartservice.placeOrder(this.body)
              .pipe(takeUntil(this.destroy$))
              .subscribe(response=>{
                address='';
                this.show=true;
                this.cssSign = false;
                this.value=100;
                
                });
                this.snackBar.open("Order Placed Successfully ", "Address", {
                  duration: 10000,
              });
                
}
else{
  /**SnackBar to display the error message */
  this.snackBar.open("Enter Delivery Address ", "Address", {
    duration: 10000,
});
}
}
/**A callback method that performs custom clean-up,
   *  invoked immediately after a directive, 
   * pipe, or service instance is destroyed.
   */
ngOnDestroy() { 
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}
