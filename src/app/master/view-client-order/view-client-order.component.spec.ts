import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientOrderComponent } from './view-client-order.component';

describe('ViewClientOrderComponent', () => {
  let component: ViewClientOrderComponent;
  let fixture: ComponentFixture<ViewClientOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientOrderComponent]
    });
    fixture = TestBed.createComponent(ViewClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
