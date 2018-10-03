import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicklerCasesDetailComponent } from './tickler-cases-detail.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinCurrencyPipe} from "../../pipes/coin-currency.pipe";

describe('TicklerCasesDetailComponent', () => {
  let component: TicklerCasesDetailComponent;
  let fixture: ComponentFixture<TicklerCasesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicklerCasesDetailComponent, CoinDateTransformPipe, WaitingBackendComponent, CoinCurrencyPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklerCasesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
