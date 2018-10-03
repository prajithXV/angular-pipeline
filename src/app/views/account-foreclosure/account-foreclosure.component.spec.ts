import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountForeclosureComponent } from './account-foreclosure.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountForeclosureComponent', () => {
  let component: AccountForeclosureComponent;
  let fixture: ComponentFixture<AccountForeclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountForeclosureComponent, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountForeclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
