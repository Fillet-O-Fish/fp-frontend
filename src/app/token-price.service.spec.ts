import { TestBed } from '@angular/core/testing';

import { TokenPriceService } from './token-price.service';

describe('TokenPriceService', () => {
  let service: TokenPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
