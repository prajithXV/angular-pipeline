import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ManageCampaignListsComponent } from './manage-campaign-lists.component';
import {FormsModule} from "@angular/forms";
import {PaginatorComponent} from "../paginator/paginator.component";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CampaignAttributeEditionComponent} from "../campaign-attribute-edition/campaign-attribute-edition.component";
import {CoinDatePipe} from "../../pipes/coin-date.pipe";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {DataService} from "../../services/data.service";
import {HttpModule} from "@angular/http";
import {UserFeedbackService} from "../../services/user-feedback.service";
import {DatePipe} from "@angular/common";
import {GlobalStateService} from "../../services/global-state.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BooleanToStringPipe} from "../../pipes/boolean-to-string.pipe";
import {dataServiceMock} from "../../../test-utils/dataServiceMock";
import {userFeedbackMock} from "../../../test-utils/userFeedback";
import {globalStateServiceMock} from "../../../test-utils/globalStateServiceMock";
import {Campaign} from "../../models/campaign";
import {By} from "@angular/platform-browser";
import {CampaignAttribute} from "../../models/campaign-attribute";
import {AttributeType} from "../../models/attribute";
import {OrderByTypesComponent} from "../order-by-types/order-by-types.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {IboxtoolsComponent} from "../../components/common/iboxtools/iboxtools.component";
import {CampaignListAttribute} from "../../models/campaign-list-attribute";
import {CampaignStatsToken} from "../../models/campaign-stats-token";


fdescribe('ManageCampaignListsComponent', () => {
  let component: ManageCampaignListsComponent;
  let fixture: ComponentFixture<ManageCampaignListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule, NgbModule ],
      declarations: [ ManageCampaignListsComponent, PaginatorComponent, WaitingBackendComponent, CampaignAttributeEditionComponent, CoinDatePipe, CoinDateInputComponent, CoinNumberInputComponent,
                      CoinNumberInputErrorsComponent, CoinDateTransformPipe, DatepickerComponent, OrderByTypesComponent, IboxtoolsComponent ],
      providers: [ {provide:DataService, useValue: dataServiceMock}, {provide: UserFeedbackService, useValue: userFeedbackMock}, DatePipe, {provide:GlobalStateService, useValue: globalStateServiceMock}, CoinDateTransformPipe,
                   BooleanToStringPipe, NgbModalStack ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCampaignListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let spy: any;

  function setCampaignValues(campaign:  Campaign){
    component.campaign = campaign;
    fixture.detectChanges();
  }

  function callsToFunctions(isPromiseResolved: boolean){
    component.ngOnInit();
    component.ngOnChanges({campaign: new Campaign("DIRECT","Direct","user2",null,[new CampaignAttribute(1,"NEW","c1",AttributeType.string,true)])});
    if(isPromiseResolved){
      tick();
    }
    fixture.detectChanges();
  }

 function onClick(index: number){
   let b = fixture.debugElement.query(By.css("tbody")).children.map(e=>e.nativeElement);
   console.log(b);
   fixture.debugElement.query(By.css("tbody")).children.map(e=>e.nativeElement)[index].querySelector('button').click();

 }

  function injectSpy(inject, method, value){
    let i = fixture.debugElement.injector.get(inject);
    return spy = spyOn(i, method).and.returnValue(Promise.resolve(value));
  }

  function checkFeedbackMessage(message: string){
    let text = fixture.debugElement.queryAll(By.css('p')).map(e => e.nativeElement);

    expect(text[0].innerText).toEqual(message);
  }


  function checkCodes(spy: any, index: number, code: string, name: string){
    expect(spy.calls.first().object.code[index].code).toEqual(code);
    expect(spy.calls.first().object.code[index].name).toEqual(name);
  }

  function checkCampaignLists(spy: any, id: number, campaignCode: string, campaignName: string, campaignId: number, createdBy: string, statusCode: string,
                              createdDate: string, attributes?, statistics?){

    let campaignList = spy.calls.first().object.campaignList.find(i=>i.id == id);

    expect(campaignList.id).toEqual(id);
    expect(campaignList.campaignCode).toEqual(campaignCode);
    expect(campaignList.campaignName).toEqual(campaignName);
    expect(campaignList.campaignId).toEqual(campaignId);
    expect(campaignList.createdBy).toEqual(createdBy);
    expect(campaignList.statusCode).toEqual(statusCode);
    expect(campaignList.createdDate).toEqual(createdDate);
    if(attributes!=null){
      expect(campaignList.attributes).toEqual(attributes);
      expect(campaignList.statistics).toEqual(statistics);
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('not resolve the promise', fakeAsync(() => {

    checkFeedbackMessage('Select a campaign');

  }));


  it('not resolve the promise and it stills searching', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
      [
        new CampaignAttribute(1,"1","c1",AttributeType.string,true),
        new CampaignAttribute(2,"2","c1",AttributeType.string,true)
      ]));

    callsToFunctions(false);

    checkFeedbackMessage('Getting campaign lists...');

  }));


  it('resolve the promise with empty campaigns lists', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
      [
        new CampaignAttribute(1,"1","c1",AttributeType.string,true),
        new CampaignAttribute(2,"2","c1",AttributeType.string,true)
      ]));

    injectSpy(DataService, 'getCampaignListStatusCodes', dataServiceMock.code);
    injectSpy(DataService, 'getCampaignLists', dataServiceMock.campaignList2);


    callsToFunctions(true);

    checkFeedbackMessage('No campaign lists found');

  }));

  it('resolve the promise with empty campaign lists and empty codes', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
      [
        new CampaignAttribute(1,"1","c1",AttributeType.string,true),
        new CampaignAttribute(2,"2","c1",AttributeType.string,true)
      ]));

    injectSpy(DataService, 'getCampaignListStatusCodes', []);
    injectSpy(DataService, 'getCampaignLists', dataServiceMock.campaignList2);

    callsToFunctions(true);

    checkFeedbackMessage('No campaign lists found');

  }));


  it('resolve the promise with campaign lists', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
        [
          new CampaignAttribute(1,"1","c1",AttributeType.string,true),
          new CampaignAttribute(2,"2","c1",AttributeType.string,true)
        ]));

    let spy = injectSpy(DataService, 'getCampaignListStatusCodes', dataServiceMock.code);
    let spy2 = injectSpy(DataService,'getCampaignLists', dataServiceMock.campaignList);

    callsToFunctions(true);

    checkCodes(spy, 0,"CLOSED","Closed");
    checkCodes(spy, 1,"NEW","New");
    checkCodes(spy, 2,"IN PROGRESS","In progress");


    checkCampaignLists(spy2, 1,"DIRECT","Direct",1,"Arslan","NEW","2018-11-29T11:22:34.57");
    checkCampaignLists(spy2, 2,"DIRECT","Direct",1,"Daryun","NEW","2018-12-29T10:22:34.57");
    checkCampaignLists(spy2, 3,"DIRECT","Direct",1,"Parm",  "NEW","2018-10-29T12:22:34.57");

  }));




  it('resolve the promise with campaign lists and detail visible', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
      [
        new CampaignAttribute(1,"1","name1",AttributeType.string,true),
        new CampaignAttribute(2,"2","name2",AttributeType.string,true),
        new CampaignAttribute(3,"3","name3",AttributeType.string,true),
        new CampaignAttribute(4,"4","name4",AttributeType.string,true),
        new CampaignAttribute(5,"5","name5",AttributeType.string,true),
        new CampaignAttribute(6,"6","name6",AttributeType.string,true)
      ]));


    let spy = injectSpy(DataService, 'getCampaignListStatusCodes', dataServiceMock.code);
    let spy2 = injectSpy(DataService,'getCampaignLists', dataServiceMock.campaignList);

    callsToFunctions(true);


    onClick(0);
    onClick(1);
    onClick(2);

    fixture.detectChanges();

    checkCodes(spy, 0,"CLOSED","Closed");
    checkCodes(spy, 1,"NEW","New");
    checkCodes(spy, 2,"IN PROGRESS","In progress");

    checkCampaignLists(spy2,1,"DIRECT","Direct",1,"Arslan","NEW", "2018-11-29T11:22:34.57",
      [new CampaignListAttribute("1","value1"), new CampaignListAttribute("2","value2")],
      [new CampaignStatsToken("DIRECT","NEW",5), new CampaignStatsToken("DIRECT","CANCELED",7)]);

    checkCampaignLists(spy2,2,"DIRECT","Direct",1,"Daryun","NEW","2018-12-29T10:22:34.57",
              [new CampaignListAttribute("3","value3"), new CampaignListAttribute("4","value4")],
               [new CampaignStatsToken("DIRECT","NEW",20), new CampaignStatsToken("DIRECT","CANCELED",17)]);

    checkCampaignLists(spy2,3,"DIRECT","Direct",1,"Parm","NEW","2018-10-29T12:22:34.57",
              [new CampaignListAttribute("5","value5"), new CampaignListAttribute("6","value6")],
               [new CampaignStatsToken("DIRECT","NEW",30), new CampaignStatsToken("DIRECT","CANCELED",20)]);

  }));



  fit('resolve the promise and click on "clone" button', fakeAsync(() => {

    setCampaignValues(
      new Campaign("DIRECT","Direct","user2",null,
        [
          new CampaignAttribute(1,"1","name1",AttributeType.string,true),
          new CampaignAttribute(2,"2","name2",AttributeType.string,true),
          new CampaignAttribute(3,"3","name3",AttributeType.string,true),
          new CampaignAttribute(4,"4","name4",AttributeType.string,true),
          new CampaignAttribute(5,"5","name5",AttributeType.string,true),
          new CampaignAttribute(6,"6","name6",AttributeType.string,true)
        ]));

    injectSpy(DataService, 'getCampaignListStatusCodes', dataServiceMock.code);
    injectSpy(DataService,'getCampaignLists', dataServiceMock.campaignList);

    callsToFunctions(true);


    //click on clone button
    let button = fixture.debugElement.query(By.css("tbody")).children.map(e=>e.nativeElement);
    let b1 = button[0].cells[7].children[1];
    b1.click();


    fixture.detectChanges();

    let formDiv = fixture.debugElement.query(By.css("div.col-lg-12")).children.map(e => e.nativeElement);
    let formDiv2 = fixture.debugElement.queryAll(By.css("div.col-lg-12 button")).map(e=>e.nativeElement)
      .filter(i=>i.attributes[0].value.includes('btn-default')).map(e=>e.innerText);
    let formDiv3 = fixture.debugElement.queryAll(By.css("div.col-lg-12 div")).map(e=>e.nativeElement);

    console.log(formDiv2)
    console.log(formDiv3)

    let h2 = formDiv[0].innerText;

    let input1 = formDiv[2].children[0][0].innerText;
    let cloneValue1 = formDiv[2].children[0][2].innerText;


    let input2 = formDiv[3].children[0][0].innerText;
    let cloneValue2 = formDiv[3].childNodes[0].childNodes[1].childNodes[5].innerText;

    let input3 = formDiv[4].children[0][0].innerText;
    let cloneValue3 = formDiv[4].childNodes[0].childNodes[1].childNodes[5].innerText;

    let input4 = formDiv[5].children[0][0].innerText;
    let cloneValue4 = formDiv[5].childNodes[0].childNodes[1].childNodes[5].innerText;

    let input5 = formDiv[6].children[0][0].innerText;
    let cloneValue5 = formDiv[6].childNodes[0].childNodes[1].childNodes[5].innerText;

    let input6 = formDiv[7].children[0][0].innerText;
    let cloneValue6 = formDiv[7].childNodes[0].childNodes[1].childNodes[5].innerText;

    expect(h2).toEqual('Create Campaign');


    expect(input1).toEqual('');
    expect(cloneValue1).toContain('value1');

    expect(input2).toEqual('');
    expect(cloneValue2).toContain('value2');


    expect(input3).toEqual('');
    expect(cloneValue3).toContain('not defined');


    expect(input4).toEqual('');
    expect(cloneValue4).toContain('not defined');


    expect(input5).toEqual('');
    expect(cloneValue5).toContain('not defined');


    expect(input6).toEqual('');
    expect(cloneValue6).toContain('not defined');

    //
    // let removebutton = fixture.debugElement.query(By.css("div.col-lg-5 button")).nativeElement;
    //
    // removebutton.click();
    //
    //
    // console.log(removebutton)
    // fixture.detectChanges();




  }));



  // it('test', fakeAsync(() => {
  //
  //   fixture.detectChanges();
  //   component.campaign = new Campaign("DIRECT","Direct","user2",null,
  //     [new CampaignAttribute(1,"1","c1",AttributeType.string,true),
  //       new CampaignAttribute(2,"2","c1",AttributeType.string,true)]);
  //
  //   let d = fixture.debugElement.injector.get(DataService);
  //   let f = fixture.debugElement.injector.get(UserFeedbackService);
  //   let spy = spyOn(d,"getCampaignListStatusCodes").and.returnValue(Promise.resolve(dataServiceMock.code));
  //   let spy2 = spyOn(d,"getCampaignLists").and.returnValue(Promise.resolve(dataServiceMock.campaignList));
  //   let spy3 = spyOn(d,"loadCampaignListStatistics").and.returnValue(Promise.resolve(dataServiceMock.CampaignStatsToken));
  //   let spy4 = spyOn(d,"launchCampaignList").and.returnValue(Promise.resolve(true));
  //
  //
  //
  //   component.ngOnInit();
  //   component.ngOnChanges({campaign: new Campaign("DIRECT","Direct","user2",null,[new CampaignAttribute(1,"NEW","c1",AttributeType.string,true)])});
  //
  //   tick();
  //
  //   fixture.detectChanges();
  //
  //
  //   let button = fixture.debugElement.query(By.css("tbody tr")).children.map(e=>e.nativeElement);
  //   let button2 = fixture.debugElement.query(By.css("button")).triggerEventHandler('click', null);
  //
  //
  //   let b2 = button[6].querySelector('button');
  //   let b3 = button[7].querySelector('button');
  //   b2.click();
  //   b3.click();
  //
  //   fixture.detectChanges();
  //
  //
  //   console.log(spy.calls.first())
  //   console.log(spy2.calls.first())
  //   console.log(spy3.calls.first(),"este")
  //   console.log(spy4.calls.first(),"este2")
  //
  //   console.log(button2);
  //
  //   console.log(component.campaign)
  //   console.log(component.currentList)
  //
  //
  // }));


});
