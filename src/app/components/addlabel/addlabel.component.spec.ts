import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlabelComponent } from './addlabel.component';

describe('AddlabelComponent', () => {
  let component: AddlabelComponent;
  let fixture: ComponentFixture<AddlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add label', async(()=>{
    expect(component.model['label']).toContain('helooooo');
    expect(component.model['label']).toContain('abc1234');

  }));
});
