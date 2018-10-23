import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratoriconComponent } from './collaboratoricon.component';

describe('CollaboratoriconComponent', () => {
  let component: CollaboratoriconComponent;
  let fixture: ComponentFixture<CollaboratoriconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratoriconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratoriconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
