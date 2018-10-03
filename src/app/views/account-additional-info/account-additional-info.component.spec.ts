import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdditionalInfoComponent } from './account-additional-info.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountAdditionalInfoComponent', () => {
  let component: AccountAdditionalInfoComponent;
  let fixture: ComponentFixture<AccountAdditionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountAdditionalInfoComponent,
        CoinDateTransformPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
