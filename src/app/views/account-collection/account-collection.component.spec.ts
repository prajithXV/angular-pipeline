import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCollectionComponent } from './account-collection.component';
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountCollectionComponent', () => {
  let component: AccountCollectionComponent;
  let fixture: ComponentFixture<AccountCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCollectionComponent, CoinDateTransformPipe, CoinCurrencyPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
