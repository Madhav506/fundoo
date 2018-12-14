import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindiconComponent } from './remindicon.component';
import { timer } from 'rxjs';

describe('RemindiconComponent', () => {
  let component: RemindiconComponent;
  let fixture: ComponentFixture<RemindiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('reminder to be created', () => {

        expect(component.customReminder(Date,timer)).toBeTruthy();
      
        expect(component.customReminder('','')).toBeFalsy();
    
      });
});











