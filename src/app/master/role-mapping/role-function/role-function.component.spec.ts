import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFunctionComponent } from './role-function.component';

describe('RoleFunctionComponent', () => {
  let component: RoleFunctionComponent;
  let fixture: ComponentFixture<RoleFunctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleFunctionComponent]
    });
    fixture = TestBed.createComponent(RoleFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
