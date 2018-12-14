import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoriconComponent } from './coloricon.component';

describe('ColoriconComponent', () => {
  let component: ColoriconComponent;
  let fixture: ComponentFixture<ColoriconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoriconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoriconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('color to be applied', () => {
  
    expect(component.changeColor('#ffffff')).toBeTruthy();
   
    expect(component.changeColor(null)).toBeFalsy();

  });
});
