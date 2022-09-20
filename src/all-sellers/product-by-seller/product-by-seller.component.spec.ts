import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBySellerComponent } from './product-by-seller.component';

describe('ProductBySellerComponent', () => {
  let component: ProductBySellerComponent;
  let fixture: ComponentFixture<ProductBySellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBySellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
