import { TestBed } from '@angular/core/testing';

import { GuardPersonaGuard } from './guard-persona.guard';

describe('GuardPersonaGuard', () => {
  let guard: GuardPersonaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardPersonaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
