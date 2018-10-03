import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinNumberInputComponent } from './coin-number-input.component';
import {FormsModule} from "@angular/forms";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {By} from "@angular/platform-browser";

describe('CoinNumberInputComponent', () => {
  let component: CoinNumberInputComponent;
  let fixture: ComponentFixture<CoinNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CoinNumberInputComponent, CoinNumberInputErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  function setValues(numStr:string, showErrors: boolean, mandatory: boolean, placeholder: string){
    component.numStr = numStr;
    component.showErrors = showErrors;
    component.mandatory = mandatory;
    component.placeholder = placeholder;
    fixture.detectChanges();

    component.refreshErrors();

    fixture.detectChanges();
  }

  function checkErrors(isMandatoryError:boolean, isFormatError:boolean, expectedText:string){

    expect(component.isMandatoryError).toEqual(isMandatoryError);
    expect(component.isFormatError).toEqual(isFormatError);

    let span = fixture.debugElement.query(By.css("coin-number-input-errors span"));
    if(span){
      expect(span.nativeElement.innerText).toEqual(expectedText);
    }else{
      // expect(span).toEqual(expectedText);
    }
  }

 function checkValues(value:string, placeholder:string){
   let input = fixture.debugElement.query(By.css("input"));
   fixture.detectChanges();

   expect(input.attributes["ng-reflect-model"]).toEqual(value);
   expect(input.properties["placeholder"]).toEqual(placeholder);

 }

  it('not empty mandatory input - show errors', () => {
    setValues("7", true, true, "");
    checkErrors(false, false, null);
    checkValues("7", "");
  });

  it('empty mandatory input - show errors', () => {
    setValues("", true, true, "test");
    checkErrors(true, false, "Field is mandatory.");
    checkValues("", "test");
  });

  it('empty mandatory input - not show errors', () => {
    setValues("", false, true, "test");
    checkErrors(true, false, null);
    checkValues("", "test");
  });

  it('not empty mandatory input with characters - show errors', () => {
    setValues("1A", true, true, "test");
    checkErrors(false, true, "Enter a valid number with 2 decimal digits max.");
    checkValues("1A", "test");
  });

  it('not empty mandatory input with 2 characters - show errors', () => {
    setValues("A7A", true, true, "test");
    checkErrors(false, true, "Enter a valid number with 2 decimal digits max.");
    checkValues("A7A", "test");
  });

  it('not empty mandatory input with characters - not show errors', () => {
    setValues("A7A", false, true, "test");
    checkErrors(false, true, null);
    checkValues("A7A", "test");
  });


});
