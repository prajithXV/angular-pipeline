import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerComponent } from './datepicker.component';
import {FormsModule} from "@angular/forms";
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import * as moment from 'moment';
import {By} from "@angular/platform-browser";
import {GlobalStateService} from "../../services/global-state.service";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";

import {MY_MOMENT_FORMATS} from "../../app.module";
import {MY_MOMENT_FORMATS_MOCK} from "../../../test-utils/dateFormatsMock";

describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule,],
      declarations: [DatepickerComponent],
      providers: [{provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS}]


    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  function setInputValue(inputDate){
    fixture.debugElement.query(By.css('input')).nativeElement.value = inputDate;
  }

  function setMomentValue(momentDate){
    component.selectedMoment = momentDate;
  }

  function setValues(momentDate, date, isMandatory, isAllowPast, pickerType, min?, max?) {

    setMomentValue(momentDate);
    setInputValue(date);

    component.pickerType = pickerType;
    component.mandatory = isMandatory;
    component.allowPast = isAllowPast;
    component.min = min;
    component.max = max;

    component.refreshDateErrors();

    //detect the changes
    fixture.detectChanges();

  }

  function checkErrors(isMandatoryError, isInvalidFormatError, isInvalidHourFormatError, isPastError, isMinError, isMaxError, expectedText){

    expect(component.isMandatoryError).toEqual(isMandatoryError);
    expect(component.isInvalidFormatError).toEqual(isInvalidFormatError);
    expect(component.isInvalidHourFormatError).toEqual(isInvalidHourFormatError);
    expect(component.isPastError).toEqual(isPastError);
    expect(component.isMinError).toEqual(isMinError);
    expect(component.isMaxError).toEqual(isMaxError);

    let div = fixture.debugElement.query(By.css('div.help-block'));
    if (div) {
      expect(div.nativeElement.innerText).toEqual(expectedText);
    } else {
      expect(div).toEqual(expectedText);
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('date without errors', () => {

    setValues(moment(new Date()),'09/20/2018', false, true,'calendar');
    checkErrors(false,false,false,false,false,false,null);

  });

  it('date without errors with hours', () => {

    setValues(moment(new Date()),'09/20/2018 09:30', false,true,'both');
    checkErrors(false,false,false,false,false,false,null);

  });

  it('empty and mandatory date', () => {

    //check errors
    setValues(null,'',true,  true,'calendar');
    checkErrors(true,false,false,false,false,false,"Field is mandatory.");

  });


  it('empty and not mandatory date', () => {

    setValues(null,'',false,  true,'calendar');
    checkErrors(false,false,false,false,false,false,null);



  });

  it('Invalid format date with date', () => {

    setValues(moment(new Date()),'02-22-2018',false, true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');


  });


  it('Invalid format date with date with hours', () => {


    setValues(moment(new Date()),'02/22/2018 5:23',false, true,'both');
    checkErrors(false,false,true,false,false,false,'Not a valid format (MM/DD/YYYY HH:mm)');


  });

  it('Invalid format date with "-" with hours', () => {


    setValues(moment(new Date()),'02-22-2018 17:23',false, true,'both');
    checkErrors(false,false,true,false,false,false,'Not a valid format (MM/DD/YYYY HH:mm)');


  });


  it('Invalid format date with character ', () => {

    //span message html error
    setValues(new Date(),'I am a character',false, true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');


  });


  it('Invalid format date with character with hours ', () => {

    //span message html error
    setValues(moment(new Date()),'01/01/2018aa 18:00',false, true,'both');
    checkErrors(false,false,true,false,false,false,'Not a valid format (MM/DD/YYYY HH:mm)');


  });


  it('Invalid format date with split date', () => {


    setValues(moment(new Date()),'01/01',false,true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');

  });


  it('Invalid format date number + character ', () => {

    setValues(moment(new Date()),'01aaa',false,true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');


  });

  it('Invalid format date split date with "-" ', () => {

    setValues(moment(new Date()),'01-01',false,true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');


  });


  it('Invalid min date', () => {

    setValues(moment(new Date(1899,0,1)),'01/01/1899',true, true,'calendar');
    checkErrors(false,false,false,false,true,false,'Date Time value must after 01/01/1900');

  });


  it('Invalid min date with invalid format', () => {

    setValues(moment(new Date(1899,0,1)),'01-01-1899',true, true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');

  });

  it('Invalid max date', () => {

    setValues(moment(new Date(2051,6,7)),'07/07/2051',true, true,'calendar');
    checkErrors(false,false,false,false,false,true,'Date Time value must before 12/31/2050');


  });

  it('Invalid max date with invalid format', () => {


    setValues(moment(new Date(2057,2,5)),'03-05-2057',true, true,'calendar');
    checkErrors(false,true,false,false,false,false,'Not a valid format (MM/DD/YYYY)');

  });


  it('Invalid min date with hours', () => {

    setValues(moment(new Date(1899,0,1, 20,30)),'01/01/1899 20:30',true, true,'both');
    checkErrors(false,false,false,false,true,false,'Date Time value must after 01/01/1900');

  });

  it('Invalid min date with hours with invalid format', () => {

    setValues(moment(new Date(1990,0,1, 20,30)),'01-01-1990 20:30',true, true,'both');
    checkErrors(false,false,true,false,false,false,'Not a valid format (MM/DD/YYYY HH:mm)');

  });


  it('Invalid max date with hours', () => {

    setValues(moment(new Date(2051,6,7,17,30)),'07/07/2051 17:30',true, true,'both');
    checkErrors(false,false,false,false,false,true,'Date Time value must before 12/31/2050');

  });


  it('Invalid max date with invalid format with hours', () => {

    setValues(moment(new Date(2057,2,5,18,30)),'03-05-2057 18:30',true, true,'both');
    checkErrors(false,false,true,false,false,false,'Not a valid format (MM/DD/YYYY HH:mm)');

  });

  //
  it('date in the past', () => {


    setValues(moment(new Date(2018,2,4)),'03/04/2018',true, false,'calendar');
    checkErrors(false,false,false,true,false,false,'Date Time value is in the past');

    //min = today with !allowPast
    expect(moment(component.min).format('MM/DD/YYYY')).toEqual(moment(component.min).calendar('today'));

  });


  it('null min date', () => {


    setValues(moment(new Date()),'03/04/2018',true, true,'calendar',null);
    checkErrors(false,false,false,false,false,false,null);

  });

  it('null max date', () => {

    setValues(moment(new Date()),'09/20/2018',true, true,'calendar',null, null);
    checkErrors(false,false,false,false,false,false,null);

  });


  it('null min date with allowPast', () => {

    setValues(moment(new Date()),'09/20/2018',true, false,'calendar',null);
    checkErrors(false,false,false,false,false,false,null);

  });


  it('null max date with allowPast', () => {

    setValues(moment(new Date()),'09/20/2018',true, false,'calendar',null, null);
    checkErrors(false,false,false,false,false,false,null);

    //min = today with !allowPast
    expect(moment(component.min).format('MM/DD/YYYY')).toEqual(moment(component.min).calendar('today'));



  });


  // check(value, isMandatoryError, isMinError, expectedText) {
  //
  // }
  //
  // it('condition to test', () => {
  //   // set component vars
  //   component.mandatory=true;
  //   //...
  //   check('09/20/2018', true, false, false, 'Not a valid format (MM/DD/YYYY)');
  // });
});
