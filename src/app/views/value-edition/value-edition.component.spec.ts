import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueEditionComponent } from './value-edition.component';
import {FormsModule} from "@angular/forms";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {By} from "@angular/platform-browser";

describe('ValueEditionComponent', () => {
  let component: ValueEditionComponent;
  let fixture: ComponentFixture<ValueEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ ValueEditionComponent, CoinNumberInputComponent, DatepickerComponent, CoinNumberInputErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setAttributeType(type: number){
    component.type = type;
    fixture.detectChanges();
  }

  function checkType(placeholder: string){
    return fixture.debugElement.query(By.css('input')).nativeElement.placeholder;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('input type', () => {

    setAttributeType(0);
    checkType('Text');

  });

  it('number type', () => {

    setAttributeType(1);
    checkType('Number');

  });


  it('datetime type', () => {

    setAttributeType(3);
    checkType('MM/DD/YYY');

  });

});
