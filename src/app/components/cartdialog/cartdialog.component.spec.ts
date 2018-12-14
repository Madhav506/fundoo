import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartdialogComponent } from './cartdialog.component';

describe('CartdialogComponent', () => {
  let component: CartdialogComponent;
  let fixture: ComponentFixture<CartdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('proceeding to checkOut ', () => {
  
    let content={
      "productId": "123abcd456ughtefg5678"
    }
        expect(component.checkOut()).toBeTruthy();
       
    this.content={
      "productId":''
    }
        expect(component.checkOut()).toBeFalsy();
    
      });
      

});
