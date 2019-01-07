import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhoneDetailComponent } from './customer-phone-detail.component';

describe('CustomerPhoneDetailComponent', () => {
  let component: CustomerPhoneDetailComponent;
  let fixture: ComponentFixture<CustomerPhoneDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPhoneDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPhoneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
