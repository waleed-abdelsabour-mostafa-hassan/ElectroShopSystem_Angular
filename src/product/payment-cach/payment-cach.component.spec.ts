import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCachComponent } from './payment-cach.component';

describe('PaymentCachComponent', () => {
  let component: PaymentCachComponent;
  let fixture: ComponentFixture<PaymentCachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
