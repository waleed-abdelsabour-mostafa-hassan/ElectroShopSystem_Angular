import { TestBed } from '@angular/core/testing';

import { ProductImgsService } from './product-imgs.service';

describe('ProductImgsService', () => {
  let service: ProductImgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductImgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
