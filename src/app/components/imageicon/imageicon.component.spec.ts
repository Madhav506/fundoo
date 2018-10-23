import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageiconComponent } from './imageicon.component';

describe('ImageiconComponent', () => {
  let component: ImageiconComponent;
  let fixture: ComponentFixture<ImageiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
