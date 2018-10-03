import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoanComponent } from './account-loan.component';
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountLoanComponent', () => {
  let component: AccountLoanComponent;
  let fixture: ComponentFixture<AccountLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLoanComponent, CoinCurrencyPipe, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
