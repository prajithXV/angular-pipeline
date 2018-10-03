import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLossMitigationComponent } from './account-loss-mitigation.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountLossMitigationComponent', () => {
  let component: AccountLossMitigationComponent;
  let fixture: ComponentFixture<AccountLossMitigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLossMitigationComponent, CoinDateTransformPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLossMitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
