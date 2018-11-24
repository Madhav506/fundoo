import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordComponent } from './resetpassword.component';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form should be valid '),async(()=>{
    expect(component.model.password.toEqual('madhu'));
    })
    
    it('Invalid Form'),async(()=>{
    expect(component.model.password.toEqual(''));
    })
});
