import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhoneModalComponent } from './customer-phone-modal.component';

describe('CustomerPhoneModalComponent', () => {
  let component: CustomerPhoneModalComponent;
  let fixture: ComponentFixture<CustomerPhoneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPhoneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPhoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
