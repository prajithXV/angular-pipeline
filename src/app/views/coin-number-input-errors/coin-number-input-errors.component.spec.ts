import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinNumberInputErrorsComponent } from './coin-number-input-errors.component';
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";

describe('CoinNumberInputErrorsComponent', () => {
  let component: CoinNumberInputErrorsComponent;
  let fixture: ComponentFixture<CoinNumberInputErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinNumberInputErrorsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinNumberInputErrorsComponent);
    component = fixture.componentInstance;

    component.host = new CoinNumberInputComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
