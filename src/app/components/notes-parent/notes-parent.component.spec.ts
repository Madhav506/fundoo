import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesParentComponent } from './notes-parent.component';

describe('NotesParentComponent', () => {
  let component: NotesParentComponent;
  let fixture: ComponentFixture<NotesParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
