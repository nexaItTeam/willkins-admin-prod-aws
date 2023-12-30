import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderTscComponent } from './view-order-tsc.component';

describe('ViewOrderTscComponent', () => {
  let component: ViewOrderTscComponent;
  let fixture: ComponentFixture<ViewOrderTscComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrderTscComponent]
    });
    fixture = TestBed.createComponent(ViewOrderTscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
