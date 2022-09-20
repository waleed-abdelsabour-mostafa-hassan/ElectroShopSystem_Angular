import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDaitelsComponent } from './order-daitels.component';

describe('OrderDaitelsComponent', () => {
  let component: OrderDaitelsComponent;
  let fixture: ComponentFixture<OrderDaitelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDaitelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDaitelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
