import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NewCallRecordComponent} from "./new-call-record.component";
import {FormsModule} from "@angular/forms";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {DataService} from "../../services/data.service";
import {GlobalStateService} from "../../services/global-state.service";
import {BackendCommsService} from "../../services/backend-comms.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {CiscoCommsService} from "../../services/cisco-comms.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CallRecordStandardSentencesComponent} from "../call-record-standard-sentences/call-record-standard-sentences.component";
import {AngularDraggableModule} from "angular2-draggable";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {By} from "@angular/platform-browser";
import * as moment from 'moment';
import {DebugElement} from "@angular/core";
import {userFeedbackMock} from "../../../test-utils/userFeedback";


describe('NewRecordCallComponent', () => {
  let component: NewCallRecordComponent;
  let fixture: ComponentFixture<NewCallRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule, AngularDraggableModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ NewCallRecordComponent, CoinNumberInputComponent, CoinNumberInputComponent, CoinNumberInputErrorsComponent, CoinDateInputComponent, WaitingBackendComponent,
                      CallRecordStandardSentencesComponent, DatepickerComponent ],
      providers: [ DataService, {provide: GlobalStateService, useValue: globalStateServiceMock}, BackendCommsService, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, CiscoCommsService, BooleanToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCallRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


   //id to search on the input and on the combos
   const _idAction = "#action ";
   const _idContacted = "#contacted ";
   const _idResult = "#result ";


  // returns combo selects
  function cOptions(id):any[]{
    return fixture.debugElement.queryAll(By.css(id + "select")).map(e=>e.nativeElement);
  }

  //return inputs option
  function iOptions(id): any[]{
    return fixture.debugElement.queryAll(By.css(id + "input")).map(e=>e.nativeElement);
  }

  //returns text area
  function tArea(): DebugElement{
    return fixture.debugElement.query(By.css("textarea"));
  }

  function coinNumberInput(){
    return fixture.debugElement.queryAll(By.css("coin-number-input input")).map(e=>e.nativeElement);
  }

  function getDatepickerInput(){
    return fixture.debugElement.queryAll(By.css("date-picker input")).map(e=>e.nativeElement);
  }

  function getDatepickerInputAsMoment(index){
    return moment(getDatepickerInput()[index].attributes[12].value).format("MM/DD/YYYY");
  }


  //force default option selected on the combo
  function setDefaultOption(id, optionIndex){
    let d = cOptions(id).map(i=>i.options[optionIndex]);
    d[0].defaultSelected = true;
  }

  //click on input checkbox option
  function clickInputOptions(index: number, id: string){
    let i = iOptions(id);

    i[index].click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }

  //checks input options: check an array
  function checkInputOptions(id: string, array: Array<boolean>){
    let options = iOptions(id).map(i=>i.checked);

    expect(options).toEqual(array);
  }

  //checks combo options
  function checkComboOptions(id: string, opId: number, isSelected: boolean, value: string, text: string){
    let o = cOptions(id).map(s=>s.selectedOptions[opId]);

    expect(o[opId].selected).toEqual(isSelected);
    expect(o[opId].value).toEqual(value);
    expect(o[opId].innerText).toEqual(text);
  }

  function checkTextArea(text: string){
    let t = tArea().properties.value;

    expect(t).toEqual(text);
  }


  // returns the today's date string + minutes/hour
  function getDate(unitNumber, unitString): string{
    let date = moment().add(unitNumber, unitString);
    let c = date.calendar();

    return c.split("Today at ")[1];
  }

  //check span call later date
  function checkCallLater(splitDate: string){
    let span = fixture.debugElement.queryAll(By.css("span")).map(e=>e.nativeElement);

    expect(span[3].innerText).toEqual('(Call at ' +  splitDate + ')' );
  }

  //click on call later buttons (+15m, +30m, 1h)
  function onClickButtons(index: number){
    let button = fixture.debugElement.queryAll(By.css("button")).map(e=>e.nativeElement);
    button[index].click();
    tick();
    fixture.detectChanges();
  }

  //set values
  function componentSetValues(isShow?: boolean, result?: string, callLaterInput?: string, message?: string, promisedAmount?: string){
    component.showCallLater = isShow;
    component.model.result = result;
    component.callLater.numStr = callLaterInput;
    component.model.message = message;
    component.promisedAmount.numStr = promisedAmount;
    fixture.detectChanges();
  }


  function saveDataToModel(isSaveAndQuit: boolean){
    tick();
    fixture.detectChanges();
    component.save(isSaveAndQuit);
    tick();
  }


  function setTodayDate(amount, unit){
    return moment().add(amount, unit).calendar('today');
  }

  function checkInput(input:string, index){
    expect(coinNumberInput()[index].attributes[4].value).toEqual(input)
  }


  /*
  *
  * example: input = today's date in format MM/DD/YYY: 05/22/2018
  *                  we add the same amount as we click on the button --> +1 day = 05/23/2018
  *
  *
  * - getDatepickerInputAsMoment is the ngModel on "Next Work date" when we click on the button +1 (etc)
  *   we return the string as a moment to can check the value
  *
  *   we expect: expect(05/23/2018).toEqual(05/23/2018)
  *                     ngModel             today's date + amount clicked
  *
  *
  *    the selected moment on the calendar also has to be the today's date + amount clicked
  *
  *
  * */
  function checkDatepickerInput(input: string, newCallRecordDate: DatepickerComponent, index: number){
   //input form
   expect(getDatepickerInputAsMoment(index)).toEqual(input);
   //selected moment of datepicker
   expect(newCallRecordDate.selectedMoment.format("MM/DD/YYYY")).toEqual(input)
  }

  function checkDatepickerMin(input: string, newCallRecordDate: DatepickerComponent){
    expect(newCallRecordDate.min.format("MM/DD/YYYY")).toEqual(input);
  }

  function checkModelSaved(action: string, callLaterDate: string, message: string, nextWorkDateAmount: number, party: string, promisedAmount: number,
                           promisedDateAmount: number, quit: boolean, result: string){


    expect(component.model.action).toEqual(action);
    expect(moment(component.model.callLaterDate).format("MM/DD/YYYY")).toEqual(callLaterDate);
    expect(component.model.message).toEqual(message);
    expect(moment(component.model.nextWorkDate).format("MM/DD/YYYY")).toEqual(moment().add(nextWorkDateAmount, "day").format("MM/DD/YYYY"));
    expect(component.model.party).toEqual(party);
    expect(component.model.promisedAmount).toEqual(promisedAmount);
    expect(moment(component.model.promisedDate).format("MM/DD/YYYY")).toEqual(moment().add(promisedDateAmount,"day").format("MM/DD/YYYY"));
    expect(component.model.quit).toEqual(quit);
    expect(component.model.result).toEqual(result);



  }



  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('new call record: OW selected', fakeAsync(() => {

    let arrayOptionsChecked = [true, false, false, false];


    iOptions(_idAction);
    cOptions(_idAction);
    tArea();

    //when is the default option we need to force the value
    setDefaultOption( _idAction, 0);

    clickInputOptions(0, _idAction);
    checkComboOptions(_idAction, 0, true, "CH", "Outgoing work");
    checkInputOptions(_idAction, arrayOptionsChecked);
    checkTextArea("Called borrower work no answer");

  }));

  it('new call record: OH selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, true, false, false];


    iOptions(_idAction);
    cOptions(_idAction);
    tArea();

    clickInputOptions(1, _idAction);
    checkComboOptions(_idAction, 0, true, "CJ", "Outgoing home");
    checkInputOptions(_idAction, arrayOptionsChecked);
    checkTextArea("Called borrower home no answer");

  }));


  it('new call record: OC selected ', fakeAsync(() => {


    let arrayOptionsChecked = [false, false, true, false];

    iOptions(_idAction);
    cOptions(_idAction);
    tArea();

    clickInputOptions(2, _idAction);
    checkComboOptions(_idAction, 0, true, "CS", "Outgoing cell");
    checkInputOptions(_idAction, arrayOptionsChecked);
    checkTextArea("Called borrower cell no answer");

  }));

  it('new call record: IC selected ', fakeAsync(() => {


    let arrayOptionsChecked = [false, false, false, true];

    iOptions(_idAction);
    cOptions(_idAction);
    tArea();

    clickInputOptions(3, _idAction);
    checkComboOptions(_idAction, 0, true, "IC", "Incoming call");
    checkInputOptions(_idAction, arrayOptionsChecked);
    checkTextArea("");

  }));

  it('new call record: Bo selected ', fakeAsync(() => {

    let arrayOptionsChecked = [true, false, false, false];

    iOptions(_idContacted);
    cOptions(_idContacted);
    tArea();

    //when is the default option we need to force the value
    setDefaultOption(_idContacted, 2 );

    clickInputOptions(0, _idContacted);
    checkComboOptions(_idContacted, 0, true, "BW", "Borrower");
    checkInputOptions(_idContacted, arrayOptionsChecked);
    checkTextArea("Called borrower work no answer");

  }));


  it('new call record: CB selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, true, false, false];

    iOptions(_idContacted);
    cOptions(_idContacted);
    tArea();

    clickInputOptions(1, _idContacted);
    checkComboOptions(_idContacted, 0, true, "CB", "CoBorrower");
    checkInputOptions(_idContacted, arrayOptionsChecked);
    checkTextArea("");

  }));


  it('new call record: FM selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, false, true, false];

    iOptions(_idContacted);
    cOptions(_idContacted);
    tArea();

    clickInputOptions(2, _idContacted);
    checkComboOptions(_idContacted, 0, true, "FM", "Family member");
    checkInputOptions(_idContacted, arrayOptionsChecked);
    checkTextArea("");

  }));


  it('new call record: Gu selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, false, false, true];

    iOptions(_idContacted);
    cOptions(_idContacted);
    tArea();

    clickInputOptions(3, _idContacted);
    checkComboOptions(_idContacted, 0, true, "GU", "Guarantor");
    checkInputOptions(_idContacted, arrayOptionsChecked);
    checkTextArea("");


  }));

  it('new call record: A/N selected ', fakeAsync(() => {

    let arrayOptionsChecked = [true, false, false, false];

    iOptions(_idResult);
    cOptions(_idResult);
    tArea();

    clickInputOptions(0, _idResult);
    checkComboOptions(_idResult, 0, true, "AN", "Answered/ No message");
    checkInputOptions(_idResult, arrayOptionsChecked);
    checkTextArea("");

  }));


  it('new call record: N/N selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, true, false, false];

    iOptions(_idResult);
    cOptions(_idResult);
    tArea();

    //when is the default option we need to force the value
    setDefaultOption( _idResult, 4);

    clickInputOptions(1, _idResult);
    checkComboOptions(_idResult, 0, true, "NA", "No answer/ No message");
    checkInputOptions(_idResult, arrayOptionsChecked);
    checkTextArea("Called borrower work no answer");


  }));


  it('new call record: PR selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, false, true, false];

    iOptions(_idResult);
    cOptions(_idResult);
    tArea();

    clickInputOptions(2, _idResult);
    checkComboOptions(_idResult, 0, true, "PP", "Payment received");
    checkInputOptions(_idResult, arrayOptionsChecked);
    checkTextArea("");

  }));

  it('new call record: LVM selected ', fakeAsync(() => {

    let arrayOptionsChecked = [false, false, false, true];

    iOptions(_idResult);
    cOptions(_idResult);
    tArea();

    clickInputOptions(3, _idResult);
    checkComboOptions(_idResult, 0, true, "VM", "Left voice mail message");
    checkInputOptions(_idResult, arrayOptionsChecked);
    checkTextArea("Called borrower work left voiceMail");

  }));



  it('new call record: Call later combo selected and click on +15m ', fakeAsync(() => {

    let res;

    componentSetValues(true, 'CL', '');
    res = getDate('minutes', 15);
    onClickButtons(0);
    checkInput('15', 0);
    checkCallLater(res);

  }));

  it('new call record: Call later combo selected and click on +30m ', fakeAsync(() => {

    let res;

    componentSetValues(true, 'CL', '');
    res = getDate('minutes', 30);
    onClickButtons(1);
    checkInput('30', 0);
    checkCallLater(res);

  }));

  it('new call record: Call later combo selected and click on +1h ', fakeAsync(() => {
     let res;

    componentSetValues(true, 'CL', '');
    res = getDate('hours', 1);
    onClickButtons(2);
    checkInput('60', 0);
    checkCallLater(res);

  }));

  it('new call record: Call later combo selected and click on +1h with not empty minute input ', fakeAsync(() => {
    let res;


    /*
    * example:
    *
    * - today's hour: 16:00h PM
    * - setValues()=> show call later, result call later, write 10 on the input
    * - getDate()=> add a today's day 70 (1h and 10 minutes)
    * - click on button 1h
    *
    * check: input 70 minutes (10 write on input + 60 click on 1h button)
    *        res: 17:10h PM
    *
    *
    * */

    componentSetValues(true, 'CL', '10');
    res = getDate('minutes', 70);
    onClickButtons(2);
    checkInput('70', 0);
    checkCallLater(res);

  }));


  it('new call record: click on +1 day next work date', fakeAsync(() => {
    let res = setTodayDate(1, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(3);
    checkDatepickerInput(res, component.workDate, 0);
    checkDatepickerMin(min, component.workDate)


  }));

  it('new call record: click on +7 days next work date', fakeAsync(() => {
    let res = setTodayDate(7, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(4);
    checkDatepickerInput(res, component.workDate, 0);
    checkDatepickerMin(min, component.workDate)


  }));

  it('new call record: click on +30 days next work date ', fakeAsync(() => {
    let res = setTodayDate(30, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(5);
    checkDatepickerInput(res, component.workDate, 0);
    checkDatepickerMin(min, component.workDate)


  }));

  it('new call record: click on +1 day promise date', fakeAsync(() => {
    let res = setTodayDate(1, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(6);
    checkDatepickerInput(res, component.promiseDate, 1);
    checkDatepickerMin(min, component.promiseDate)


  }));

  it('new call record: click on +7 days promise date', fakeAsync(() => {
    let res = setTodayDate(7, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(7);
    checkDatepickerInput(res, component.promiseDate, 1);
    checkDatepickerMin(min, component.promiseDate)


  }));

  it('new call record: click on +30 days promise date ', fakeAsync(() => {
    let res = setTodayDate(30, "days");
    let min = setTodayDate(0, "days");

    onClickButtons(8);
    checkDatepickerInput(res, component.promiseDate, 1);
    checkDatepickerMin(min, component.promiseDate);

  }));


  it('new call record: click on "Save and Quit" button ', fakeAsync(() => {
    onClickButtons(8);
    onClickButtons(3);
    componentSetValues(false, "NA", "", "test", "2");
    saveDataToModel(true);
    checkModelSaved("CH", "Invalid date", "test", 1, "BW", 2, 30, true, "NA");

  }));


  it('new call record: click on "Save" button ', fakeAsync(() => {
    onClickButtons(7);
    onClickButtons(5);
    clickInputOptions(1, _idAction);
    clickInputOptions(1, _idContacted);
    componentSetValues(false, "NN" , "", "test2", "3");
    saveDataToModel(false);
    checkModelSaved("CJ", "Invalid date", "test2", 30, "CB", 3, 7, false, "NN");

  }));

  it('new call record: click on "Save" button with call later ', fakeAsync(() => {
    onClickButtons(7);
    onClickButtons(5);
    clickInputOptions(1, _idAction);
    clickInputOptions(1, _idContacted);
    componentSetValues(true, "CL" , "", "test2", "3");
    saveDataToModel(false);
    checkModelSaved("CJ", moment().format("MM/DD/YYYY"), "test2", 30, "CB", 3, 7, false, "CL");

  }));


});
