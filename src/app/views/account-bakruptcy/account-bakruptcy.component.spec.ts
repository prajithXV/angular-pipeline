import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBakruptcyComponent } from './account-bakruptcy.component';
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('AccountBakruptcyComponent', () => {
  let component: AccountBakruptcyComponent;
  let fixture: ComponentFixture<AccountBakruptcyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBakruptcyComponent, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBakruptcyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
