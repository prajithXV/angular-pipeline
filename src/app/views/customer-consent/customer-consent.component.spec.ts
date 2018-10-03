import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsentComponent } from './customer-consent.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {ConsentPipe} from "../../pipes/consent.pipe";

describe('CustomerConsentComponent', () => {
  let component: CustomerConsentComponent;
  let fixture: ComponentFixture<CustomerConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerConsentComponent, WaitingBackendComponent, CoinDateTransformPipe, ConsentPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
