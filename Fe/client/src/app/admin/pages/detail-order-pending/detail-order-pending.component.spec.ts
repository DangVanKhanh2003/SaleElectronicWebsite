import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderPendingComponent } from './detail-order-pending.component';

describe('DetailOrderPendingComponent', () => {
  let component: DetailOrderPendingComponent;
  let fixture: ComponentFixture<DetailOrderPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOrderPendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailOrderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
