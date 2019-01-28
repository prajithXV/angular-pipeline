import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEmailDetailComponent } from './customer-email-detail.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('CustomerEmailDetailComponent', () => {
  let component: CustomerEmailDetailComponent;
  let fixture: ComponentFixture<CustomerEmailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEmailDetailComponent, CoinDateTransformPipe ]
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
