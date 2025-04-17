import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDiscountModalComponent } from './remove-discount-modal.component';

describe('RemoveDiscountModalComponent', () => {
  let component: RemoveDiscountModalComponent;
  let fixture: ComponentFixture<RemoveDiscountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveDiscountModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
