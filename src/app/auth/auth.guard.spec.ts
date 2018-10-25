import { TestBed, async, inject } from '@angular/core/testing';

import { AuthguardGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardGuard]
    });
  });

  it('should ...', inject([AuthguardGuard], (guard: AuthguardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
