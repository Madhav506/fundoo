import { Component, OnInit,OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../core/services/user/user.service';
import { CartdialogComponent } from '../cartdialog/cartdialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-productcart',
  templateUrl: './productcart.component.html',
  styleUrls: ['./productcart.component.scss']
})
export class ProductcartComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
public cards=[];
public cardArray=[];
private  service;
  selectedBefore: boolean;
  constructor(public user:UserService,public dialog: MatDialog) { }
  ngOnInit() {
    this.getCardData();
  }

getCardData(){

  this.user.getDataServiceBasicAdvance()
  //whenever response from server arrives the callback passed to subscribe()
  .subscribe((response) => {
      let data = response["data"];
      for (let i = 0; i < data.data.length; i++) {
          this.cards.push(data.data[i]);
      }
      // console.log(this.cards)

  })
}
changeCardColor(card) {

  this.service = card.name;
  console.log(this.service);
  card.check =!card.check ;
  for (let i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
          continue;
      }
      this.cards[i].check = false;
  }
  // this.openDialogCart();

}

openDialogCart(itemData){
  const cartDialog = this.dialog.open(CartdialogComponent, {
    maxWidth: 'auto',
    height: 'auto',
    data:itemData,
    panelClass: 'myapp-no-padding-dialog'

  });
  cartDialog.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

// clicked(card){
//   if(card.select==true){
//   this.selectedBefore=true;
//   return;
//   }
//   card.select = true;
//   for (let i = 0; i < this.cardArray.length; i++) {
//   if (card.index == this.cardArray[i].index) {
//   continue;
//   }
//   this.cardArray[i].select = false;
//   }
  
//   }
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}

 }
