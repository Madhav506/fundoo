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
  it('question to be asked', () => {
  
    let content={
      "message": "what is angular",
      "notesId": "123abcd456ughtefg5678"
    }
        expect(component.askQuestion()).toBeTruthy();
       
        content = {
        "message": "",
        "notesId": ""
      }
        expect(component.askQuestion()).toBeFalsy();
    
      });
    
  
  it('to be liked', () => {
    let like=[{
      like:Boolean,
      userId:"5bc040b25414a900407e8e71"
    }]
    let content={
      like: like
    }
    expect(component.like(content)).toBeTruthy();

     like=[{
      like:null,
      userId:""
    }]
     content={
      like:null
    }
    expect(component.like(content)).toBeFalsy();
  });

   
  it('rating to be given', () => {
   
    let content = {
      id: "5c00c196019ffc00400b0d9b"
    }
    expect(component.ratingAnswer(content,event)).toBeTruthy();
  
    content = {
      id: ""
    }
    expect(component.ratingAnswer(content,event)).toBeFalsy();
  });
  it('reply to be given', () => {
   
    let ques = {
      id: "5c00c196019ffc00400b0d9b"
    }
    expect(component.replyQuestion(ques)).toBeTruthy();
  
    ques = {
      id: ""
    }
    expect(component.replyQuestion(ques)).toBeFalsy();
  });
 
});
