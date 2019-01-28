import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressDetailComponent } from './customer-address-detail.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('CustomerAddressDetailComponent', () => {
  let component: CustomerAddressDetailComponent;
  let fixture: ComponentFixture<CustomerAddressDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddressDetailComponent, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
