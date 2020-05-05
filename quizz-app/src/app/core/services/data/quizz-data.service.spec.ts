import { TestBed } from '@angular/core/testing';

import { QuizzDataService } from './quizz-data.service';

describe('QuizzDataService', () => {
  let service: QuizzDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
