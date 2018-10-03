import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHistoryComponent } from './account-history.component';
import {CoinDatePipe} from "../../pipes/coin-date.pipe";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountHistoryComponent', () => {
  let component: AccountHistoryComponent;
  let fixture: ComponentFixture<AccountHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountHistoryComponent,CoinDateTransformPipe, CoinCurrencyPipe, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
