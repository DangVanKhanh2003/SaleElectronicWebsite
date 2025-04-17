import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiscountModalComponent } from './list-discount-modal.component';

describe('ListDiscountModalComponent', () => {
  let component: ListDiscountModalComponent;
  let fixture: ComponentFixture<ListDiscountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDiscountModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
