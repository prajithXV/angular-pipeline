import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCallRecordsComponent } from './customer-call-records.component';
import {CoinDatePipe} from "../../pipes/coin-date.pipe";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('CustomerCallRecordsComponent', () => {
  let component: CustomerCallRecordsComponent;
  let fixture: ComponentFixture<CustomerCallRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCallRecordsComponent, CoinDateTransformPipe, CoinCurrencyPipe, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCallRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
