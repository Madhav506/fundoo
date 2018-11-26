import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreiconComponent } from './moreicon.component';

describe('MoreiconComponent', () => {
  let component: MoreiconComponent;
  let fixture: ComponentFixture<MoreiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete note', async(()=>{
    expect(component.model.isDeleted).toEqual(true);
    expect(component.model.isDeleted).toBeTruthy();
  }))
  it('should not delete the note', async(()=>{
    expect(component.model.isDeleted).toEqual(false);
    expect(component.model.isDeleted).toBeFalsy();
  }))
  it('should not add label', async(()=>{
    expect(component.model.isDeleted).toBeFalsy();
  }))
});
