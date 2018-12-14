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
  it('Collaborator to be added', () => {
  
    let content={
     
      "userId": "123abcd456ughtefg5678"
    }
        expect(component.addingCollaborator(content)).toBeTruthy();
       
        content = {
        "userId": ""
      }
        expect(component.addingCollaborator(content)).toBeFalsy();
    
      });
      
  it('Collaborator to be removed', () => {
  
    let content={
     
      "userId": "123abcd456ughtefg5678"
    }
        expect(component.removeCollaborator(content)).toBeTruthy();
       
        content = {
        "userId": ""
      }
        expect(component.removeCollaborator(content)).toBeFalsy();
    
      });
      

});
