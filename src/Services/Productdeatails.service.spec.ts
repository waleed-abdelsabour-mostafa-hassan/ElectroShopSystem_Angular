import { TestBed } from '@angular/core/testing';

import { ProductdeatailsService } from './proddeatails.service';

describe('ProductdeatailsService', () => {
  let service: ProductdeatailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductdeatailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
