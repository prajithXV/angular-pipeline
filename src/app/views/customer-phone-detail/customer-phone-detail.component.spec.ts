import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPhoneDetailComponent } from './customer-phone-detail.component';
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";

describe('CustomerPhoneDetailComponent', () => {
  let component: CustomerPhoneDetailComponent;
  let fixture: ComponentFixture<CustomerPhoneDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPhoneDetailComponent, TelephonePipe, CoinDateTransformPipe ]
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
