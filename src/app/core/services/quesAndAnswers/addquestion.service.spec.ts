import { TestBed } from '@angular/core/testing';

import { AddquestionService } from './addquestion.service';

describe('AddquestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddquestionService = TestBed.get(AddquestionService);
    expect(service).toBeTruthy();
  });
});
