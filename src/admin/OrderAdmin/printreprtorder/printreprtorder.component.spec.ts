import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintreprtorderComponent } from './printreprtorder.component';

describe('PrintreprtorderComponent', () => {
  let component: PrintreprtorderComponent;
  let fixture: ComponentFixture<PrintreprtorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintreprtorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintreprtorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
