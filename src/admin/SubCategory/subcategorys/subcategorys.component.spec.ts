import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategorysComponent } from './subcategorys.component';

describe('SubcategorysComponent', () => {
  let component: SubcategorysComponent;
  let fixture: ComponentFixture<SubcategorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
