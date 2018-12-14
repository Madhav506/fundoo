import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Order to be placed', () => {
  
    let content={
      "address": "what is angular",
      "cartId": "123abcd456ughtefg5678"
    }
        expect(component.placeOrder(content)).toBeTruthy();
       
        content = {
        "address": "",
        "cartId": ""
      }
        expect(component.placeOrder('')).toBeFalsy();
    
      });
      

    
});
