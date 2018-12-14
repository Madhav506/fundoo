import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CartserviceService } from '../../core/services/cartService/cartservice.service';

@Component({
  selector: 'app-cartdialog',
  templateUrl: './cartdialog.component.html',
  styleUrls: ['./cartdialog.component.scss']
})
export class CartdialogComponent implements OnInit {

  constructor( public cartDialog: MatDialogRef<CartdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CartdialogComponent,public router:Router,public cartService:CartserviceService) { }

  ngOnInit() {
    
  }
  // localStorage.setItem('productId')

  public content;
  closeDialog() {
    this.cartDialog.close();

  }
  
  checkOut(){
    this.cartDialog.close();
    this.router.navigate(['/signup']);

    this.content={
      "productId":this.data['id']
    }
    this.cartService.addToCart(this.content).subscribe(response=>{
localStorage.setItem('productId',response['data']['details']['id']);

    });

   
  }
  ;


}
