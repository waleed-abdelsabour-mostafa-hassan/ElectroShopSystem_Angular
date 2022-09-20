import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsapproveComponent } from './productsapprove.component';

describe('ProductsapproveComponent', () => {
  let component: ProductsapproveComponent;
  let fixture: ComponentFixture<ProductsapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
