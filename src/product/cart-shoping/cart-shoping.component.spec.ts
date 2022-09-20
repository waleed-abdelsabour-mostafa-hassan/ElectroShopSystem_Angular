import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShopingComponent } from './cart-shoping.component';

describe('CartShopingComponent', () => {
  let component: CartShopingComponent;
  let fixture: ComponentFixture<CartShopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartShopingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartShopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
