import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCollaboratorComponent } from './dialog-collaborator.component';

describe('DialogCollaboratorComponent', () => {
  let component: DialogCollaboratorComponent;
  let fixture: ComponentFixture<DialogCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
