import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmailModalComponent } from './customer-email-modal.component';

describe('CustomerEmailModalComponent', () => {
  let component: CustomerEmailModalComponent;
  let fixture: ComponentFixture<CustomerEmailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEmailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
