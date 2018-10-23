import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoiconComponent } from './undoicon.component';

describe('UndoiconComponent', () => {
  let component: UndoiconComponent;
  let fixture: ComponentFixture<UndoiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndoiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
