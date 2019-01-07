import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmailDetailComponent } from './customer-email-detail.component';

describe('CustomerEmailDetailComponent', () => {
  let component: CustomerEmailDetailComponent;
  let fixture: ComponentFixture<CustomerEmailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEmailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEmailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
