import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotescardComponent } from './notescard.component';

describe('NotescardComponent', () => {
  let component: NotescardComponent;
  let fixture: ComponentFixture<NotescardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotescardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotescardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
