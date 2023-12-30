import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEnquiryComponent } from './add-edit-enquiry.component';

describe('AddEditEnquiryComponent', () => {
  let component: AddEditEnquiryComponent;
  let fixture: ComponentFixture<AddEditEnquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditEnquiryComponent]
    });
    fixture = TestBed.createComponent(AddEditEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
