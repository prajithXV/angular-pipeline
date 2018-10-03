import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsProductivityCriteriaComponent } from './collectors-productivity-criteria.component';
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";

describe('CollectorsProductivityCriteriaComponent', () => {
  let component: CollectorsProductivityCriteriaComponent;
  let fixture: ComponentFixture<CollectorsProductivityCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ CollectorsProductivityCriteriaComponent, CoinDateInputComponent, DatepickerComponent, WaitingBackendComponent ],
      providers: [ DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsProductivityCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
