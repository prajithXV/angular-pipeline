import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDateInputComponent } from './coin-date-input.component';
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

describe('CoinDateInputComponent', () => {
  let component: CoinDateInputComponent;
  let fixture: ComponentFixture<CoinDateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ FormsModule ],
      declarations: [ CoinDateInputComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
