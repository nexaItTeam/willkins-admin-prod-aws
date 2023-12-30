import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorHoldingComponent } from './investor-holding.component';

describe('InvestorHoldingComponent', () => {
  let component: InvestorHoldingComponent;
  let fixture: ComponentFixture<InvestorHoldingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorHoldingComponent]
    });
    fixture = TestBed.createComponent(InvestorHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
