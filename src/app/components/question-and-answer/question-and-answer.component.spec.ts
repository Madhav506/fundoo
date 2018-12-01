import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndAnswerComponent } from './question-and-answer.component';

describe('QuestionAndAnswerComponent', () => {
  let component: QuestionAndAnswerComponent;
  let fixture: ComponentFixture<QuestionAndAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAndAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('note should have title description ', async(()=>{
    expect(component.noteDetails.title).toEqual('note');
    expect(component.noteDetails.title).toBeTruthy();
    expect(component.noteDetails.description).toEqual('abcdefghi4567');
    expect(component.noteDetails.description).toBeTruthy();
  }));
  
  it('note should  title description not empty', async(()=>{
    expect(component.noteDetails.title).toEqual('');
    expect(component.noteDetails.title).toBeFalsy();
    expect(component.noteDetails.description).toEqual('');
    expect(component.noteDetails.description).toBeFalsy();
  }));
});
