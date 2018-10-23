import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedoiconComponent } from './redoicon.component';

describe('RedoiconComponent', () => {
  let component: RedoiconComponent;
  let fixture: ComponentFixture<RedoiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedoiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedoiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
