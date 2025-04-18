import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryModalComponent } from './edit-category.component';

describe('EditCategoryComponent', () => {
  let component: EditCategoryModalComponent;
  let fixture: ComponentFixture<EditCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
