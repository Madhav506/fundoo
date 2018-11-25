import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create note', async(()=>{
    expect(component.body.title).toEqual('note');
    expect(component.body.title).toBeTruthy();
    expect(component.body.description).toEqual('abcdefghi4567');
    expect(component.body.description).toBeTruthy();
  }));
  
  it('should not create/add note', async(()=>{
    expect(component.body.title).toEqual('');
    expect(component.body.title).toBeFalsy();
    expect(component.body.description).toEqual('');
    expect(component.body.description).toBeFalsy();
  }));
});

